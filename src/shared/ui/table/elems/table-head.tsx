import { MouseEvent } from 'react';

import { BarsDescendingAlignCenter, Xmark } from '@gravity-ui/icons';
import { Button, Icon, List } from '@gravity-ui/uikit';

import { TABLE_SORT_OPTIONS } from '@/shared/constants/table-sort-options.ts';
import { useTableValues } from '@/shared/hooks/use-table-values.ts';
import { Popover } from '@/shared/ui/popover/popover.tsx';
import { TableDataItem, TableProps } from '@/shared/ui/table/table.tsx';
import {
  getColumnIsFilteredValue,
  useTable,
} from '@/shared/ui/table/use-table.tsx';
import { cn } from '@/shared/utils/cn.ts';

export const TableHeader = <T extends TableDataItem>(props: TableProps<T>) => {
  const { columns = [], name } = props;

  const { renderFilter, onSort, getSortSelected, removeFilter } =
    useTable(props);

  const tableFilterValues = useTableValues(name);

  return (
    <thead>
      <tr>
        {columns.map((column, index) => {
          const { className, ...thProps } = column.thProps || { className: '' };

          const filterValue = getColumnIsFilteredValue(
            column,
            tableFilterValues,
          );

          return (
            <th
              key={column.key.toString()}
              align='left'
              className={cn(
                'border-b border-border p-1 pb-3 text-xs font-semibold',
                className,
              )}
              {...thProps}
            >
              {column?.filter || column?.sortKey ? (
                <Popover
                  placement={index ? 'bottom' : 'bottom-start'}
                  content={
                    <div className='min-w-32 space-y-2 p-1'>
                      {column?.filter && renderFilter(column)}

                      {column?.sortKey && (
                        <List
                          activeItemIndex={getSortSelected()}
                          filterable={false}
                          itemClassName='rounded'
                          itemHeight={32}
                          items={TABLE_SORT_OPTIONS}
                          virtualized={false}
                          renderItem={(item) => (
                            <button
                              className='px-2.5'
                              onClick={() =>
                                onSort(String(column.sortKey), item.key)
                              }
                            >
                              {item.title}
                            </button>
                          )}
                        />
                      )}
                    </div>
                  }
                >
                  <button
                    className={cn(
                      'animated group inline-flex items-center whitespace-nowrap rounded px-1.5 py-1 hover:bg-background-float active:scale-95',
                      {
                        'bg-background-float button:visible button:opacity-100':
                          Boolean(filterValue),
                      },
                    )}
                  >
                    {column.title}{' '}
                    <span className='max-w-t-filter truncate'>
                      {filterValue ? `:${filterValue}` : ''}
                    </span>
                    {filterValue && (column?.filter?.key || column?.key) ? (
                      <Button
                        className='animated invisible ml-1 items-center opacity-0 clamp-4 group-hover:visible group-hover:opacity-100'
                        size='xs'
                        view='flat'
                        onClick={(event) =>
                          removeFilter(
                            event as MouseEvent<HTMLButtonElement>,
                            column,
                          )
                        }
                      >
                        <Icon className='size-3.5' data={Xmark} />
                      </Button>
                    ) : (
                      <Icon
                        className='animated invisible ml-1 size-3.5 opacity-0 group-hover:visible group-hover:opacity-100'
                        data={BarsDescendingAlignCenter}
                      />
                    )}
                  </button>
                </Popover>
              ) : (
                <span className='px-1.5 py-1'>{column.title}</span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
