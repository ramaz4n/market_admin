/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MouseEvent, useCallback, useMemo } from 'react';

import { DateTime } from '@gravity-ui/date-utils';
import { SelectOption } from '@gravity-ui/uikit';
import { useFormContext } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';

import { useTableValues } from '@/shared/hooks/use-table-values.ts';
import { $tableApi } from '@/shared/models/table.ts';
import {
  DatePicker,
  DatePickerProps,
} from '@/shared/ui/date-picker/date-picker.tsx';
import { Input, InputProps } from '@/shared/ui/input/input.tsx';
import { PaginationProps } from '@/shared/ui/pagination/pagination.tsx';
import { Select, SelectProps } from '@/shared/ui/select/select.tsx';
import {
  TableDataColumn,
  TableDataItem,
  TableProps,
} from '@/shared/ui/table/table.tsx';
import { dater } from '@/shared/utils/dater.ts';

export const DEBOUNCE_DELAY = 700;

export const useTable = <T = undefined,>({ name }: TableProps) => {
  const tablesStore = useTableValues(name);
  const context = useFormContext();

  const onInputChange = useDebounceCallback(
    (filedName: string, value: string) => {
      if (!value) {
        $tableApi.remove({ name: filedName, tName: name });

        return;
      }
      $tableApi.update({ name, value: { [filedName]: value } });
    },
    DEBOUNCE_DELAY,
  );

  const onSelectChange = (filedName: string, value: string[]) => {
    if (!value || !value.length) {
      $tableApi.remove({ name: filedName, tName: name });

      return;
    }
    $tableApi.update({ name, value: { [filedName]: value.join('') } });
  };

  const onDatePickerChange = (filedName: string, value: DateTime | null) => {
    if (!value) {
      $tableApi.remove({ name: filedName, tName: name });

      return;
    }

    const utcHours = Math.abs(value.toDate().getTimezoneOffset()) / 60;
    const utcSeconds = utcHours * 60 * 60;

    const currentUnix = value.unix() + utcSeconds;

    if (currentUnix < 0) return;

    $tableApi.update({
      name,
      value: {
        [filedName]: currentUnix,
      },
    });
  };

  const renderFilter = useCallback((column: TableDataColumn<T>) => {
    if (!column.filter) return null;

    const { type, props, key } = column.filter;

    const currentKey = key ?? column.key;

    switch (type) {
      case 'input': {
        return (
          // @ts-ignore
          <Input
            onChange={onInputChange}
            {...(props as InputProps)}
            name={currentKey as string}
          />
        );
      }
      case 'select': {
        return (
          <Select
            {...(props as SelectProps)}
            name={currentKey as string}
            onChange={onSelectChange}
          />
        );
      }
      case 'date-picker': {
        return (
          <DatePicker
            {...(props as DatePickerProps)}
            name={currentKey as string}
            onChange={onDatePickerChange}
          />
        );
      }
      default: {
        return null;
      }
    }
  }, []);

  const onSort = (key: string, order: string) => {
    if (order === 'none') {
      return $tableApi.remove({ name: 'sort', tName: name });
    }

    if (order === 'desc') {
      return $tableApi.update({ name, value: { sort: `-${key}` } });
    }

    $tableApi.update({ name, value: { sort: key } });
  };

  const getSortSelected = () => {
    const currentSort = String(tablesStore?.sort ?? '');

    if (!currentSort) return;

    return currentSort.startsWith('-') ? 1 : 0;
  };

  const removeFilter = (
    e: MouseEvent<HTMLButtonElement>,
    column: TableDataColumn<T>,
  ) => {
    e.stopPropagation();
    const key = String(column.filter?.key ?? column.key ?? '');

    if (!key) return;

    $tableApi.remove({
      name: key,
      tName: name,
    });

    context.resetField(key);
  };

  // useEffect(() => {
  //   if (Object.values(tablesStore).length) {
  //     for (const k in tablesStore) {
  //       $tableApi.update({
  //         name,
  //         value: { [k]: tablesStore[k] },
  //       });
  //     }
  //   }
  // }, []);

  return { getSortSelected, onSort, removeFilter, renderFilter };
};

export const useTablePagination = ({ name, pagination }: TableProps) => {
  const tablesStore = useTableValues(name);

  const onChange = (page: number) => {
    $tableApi.update({ name, value: { page } });
  };

  const currentPage = Number(tablesStore?.page || 1);

  return useMemo(
    (): PaginationProps => ({
      className: 'ml-auto mt-2',
      last_page: pagination?.last_page,
      onChange,
      page: currentPage,
    }),
    [pagination, currentPage],
  );
};

export function getColumnIsFiltered(
  column: TableDataColumn<TableDataItem>,
  filterValues: ReturnType<typeof useTableValues>,
) {
  if (!Object.values(filterValues || {}).length) return false;

  const key = String(column.filter?.key ?? column.key);

  let sortable = false;

  if (filterValues.sort) {
    sortable = filterValues.sort.toString().includes(key);
  }

  return Boolean(filterValues?.[key] || sortable);
}

export function getColumnIsFilteredValue(
  column: TableDataColumn<TableDataItem>,
  filterValues: ReturnType<typeof useTableValues>,
) {
  if (!getColumnIsFiltered(column, filterValues)) return null;

  const key = String(column.filter?.key ?? column.key);

  const selectOptions = (column.filter?.props as SelectProps)?.options || [];

  const value = filterValues?.[key];

  if (!value) return null;

  switch (column?.filter?.type) {
    case 'date-picker': {
      return dater.toString((value as unknown as DateTime).unix()) ?? null;
    }
    case 'select': {
      if (!selectOptions?.length) return null;
      const option = (selectOptions as SelectOption[]).find(
        (o) => o.value === value,
      )?.content;

      return option ?? null;
    }
    case 'input': {
      return value as string;
    }
    default: {
      return null;
    }
  }
}
