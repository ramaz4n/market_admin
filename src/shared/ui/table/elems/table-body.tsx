import { Loader, Text } from '@gravity-ui/uikit';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { $tableApi } from '@/shared/models/table.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { TableDataItem, TableProps } from '@/shared/ui/table/table.tsx';
import { getKeyValue } from '@/shared/ui/table/utils/get-key-value.ts';
import { cn } from '@/shared/utils/cn.ts';

export const TableBody = <T extends TableDataItem>(props: TableProps) => {
  const {
    data = [],
    columns = [],
    onRowClick,
    rowCellClassName,
    isLoading,
    isFetching,
    emptyDataLabel,
    name,
  } = props;

  const context = useFormContext();

  const navFunc = useNavigate();

  const handleRowClick = (item: T) => {
    onRowClick?.(item, navFunc);
  };

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td align='center' className='py-4' colSpan={columns.length}>
            <Loader />
          </td>
        </tr>
      </tbody>
    );
  }

  if (!data.length) {
    return (
      <tbody>
        <tr>
          <td align='center' className='py-4 text-sm' colSpan={columns.length}>
            <div className='flex items-center justify-center gap-2'>
              <img
                alt='No data'
                className='size-fit'
                src='/images/empty-data.svg'
              />
              <div className='flex flex-col items-start gap-3.5'>
                {emptyDataLabel && (
                  <Text variant='subheader-3'>{emptyDataLabel} не найдены</Text>
                )}

                <Text className='max-w-72 text-start text-secondary-text'>
                  Попробуйте изменить условия или сбросить настройки фильтра.
                </Text>

                <Button
                  view='normal'
                  onClick={() => {
                    $tableApi.clear(name);
                    context.reset();
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((item) => (
        <tr
          key={item?.id}
          className={cn(
            'fs-sm border-t border-border transition-all duration-150 first-of-type:border-t-0',
            {
              'cursor-pointer hover:bg-background-generic': onRowClick,
              'opacity-25': isFetching,
            },
          )}
          onClick={() => handleRowClick(item)}
        >
          {columns.map((c) => {
            const { className, ...tdProps } = c.tdProps || { className: '' };

            return (
              <td
                key={c.key.toString()}
                className={cn(
                  'px-2 py-1 font-normal',
                  className,
                  rowCellClassName,
                  {
                    '!w-1': new Set(['actions', 'view']).has(c.key as string),
                  },
                )}
                onClick={(e) => {
                  if (new Set(['actions', 'view']).has(c.key as string)) {
                    e.stopPropagation();
                  }
                }}
                {...tdProps}
              >
                {getKeyValue(item, c)}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
