/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLAttributes, ReactNode } from 'react';

import { ArrowRotateRight } from '@gravity-ui/icons';
import { Icon, Text } from '@gravity-ui/uikit';
import { useFormContext } from 'react-hook-form';
import { type NavigateFunction } from 'react-router-dom';

import { useTableIsFiltered } from '@/shared/hooks/use-table-values.ts';
import { $tableApi } from '@/shared/models/table.ts';
import { TableNames } from '@/shared/types/table.ts';
import { TooltipButton } from '@/shared/ui/button/button.tsx';
import { InputProps } from '@/shared/ui/input/input.tsx';
import { Pagination } from '@/shared/ui/pagination/pagination.tsx';
import { SelectProps } from '@/shared/ui/select/select.tsx';
import { TableBody } from '@/shared/ui/table/elems/table-body.tsx';
import { TableHeader } from '@/shared/ui/table/elems/table-head.tsx';
import { useTablePagination } from '@/shared/ui/table/use-table.tsx';
import { cn } from '@/shared/utils/cn.ts';

export type TableDataItem = any;

export type TableDataColumns<T = TableDataItem> = Array<TableDataColumn<T>>;

export type TableFilterProps<T> = {
  props: Partial<InputProps | SelectProps>;
  key?: keyof T | string;
  type?: 'input' | 'select' | 'date-picker';
};

export type TableDataColumn<T> = {
  key: keyof T | string;
  title: ReactNode;
  filter?: TableFilterProps<T>;
  render?: (data: T) => ReactNode;
  sortKey?: keyof T | string;
  tdProps?: HTMLAttributes<HTMLElement>;
  thProps?: HTMLAttributes<HTMLElement>;
};

export interface TableProps<T = TableDataItem> {
  columns: TableDataColumns;
  data: T[];
  name: TableNames;
  className?: HTMLElement['className'];
  emptyDataLabel?: ReactNode;
  heading?: ReactNode;
  isFetching?: boolean;
  isLoading?: boolean;
  onRowClick?: (item: T, navFunc: NavigateFunction) => void;
  pagination?: {
    last_page: number;
  };
  rowCellClassName?: string;
}

export const Table = <T extends TableDataItem>(props: TableProps<T>) => {
  const { heading, className, name } = props;

  const pagination = useTablePagination(props);

  const tableStoreHasValues = useTableIsFiltered(name);

  const context = useFormContext();

  return (
    <>
      {heading && (
        <div className={cn('gap-2 flex-between')}>
          <Text variant='header-2'>{heading}</Text>

          {tableStoreHasValues && (
            <TooltipButton
              size='s'
              tooltipProps={{ content: 'Сбросить фильтры' }}
              view='flat'
              onClick={() => {
                $tableApi.clear(name);
                context.reset();
              }}
            >
              <Icon data={ArrowRotateRight} />
              Сбросить
            </TooltipButton>
          )}
        </div>
      )}

      <div className='overflow-x-auto'>
        <table
          className={cn(
            'w-full min-w-max border-collapse text-foreground',
            className,
          )}
        >
          <TableHeader<T> {...props} />

          <TableBody<T> {...props} />
        </table>
      </div>

      <Pagination {...pagination} />
    </>
  );
};
