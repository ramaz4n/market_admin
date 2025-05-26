import { HTMLAttributes } from 'react';

import { ChevronLeft } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';

import { DOTS, usePagination } from '@/shared/ui/pagination/use-pagination.ts';
import { cn } from '@/shared/utils/cn.ts';
import { dataAttr } from '@/shared/utils/create-data-attr.ts';

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  last_page: number | undefined;
  onChange: (page: number) => void;
  page: number;
  countRecord?: number;
  siblingCount?: number;
}

export const Pagination = (props: PaginationProps) => {
  const {
    goToPage,
    paginationRange,
    isFirstPage,
    page,
    isLastPage,
    onPrev,
    onNext,
    className,
  } = usePagination(props);

  if (paginationRange.length < 2) return null;

  return (
    <div
      className={cn(
        'scrollbar-hide w-fit max-w-96 gap-4 overflow-x-auto',
        className,
      )}
    >
      <nav className='isolate inline-flex items-center gap-1.5 text-sm text-foreground'>
        <button
          className='animated size-7 rounded flex-center hover:bg-background-generic disabled:opacity-disabled disabled:hover:bg-transparent'
          disabled={isFirstPage}
          onClick={onPrev}
        >
          <Icon data={ChevronLeft} />
        </button>

        {paginationRange.map((i, index) => {
          if (i === DOTS) {
            return (
              <span key={index} className='size-7 flex-center'>
                ...
              </span>
            );
          }

          return (
            <button
              {...dataAttr('active', i === page)}
              key={index}
              className='animated size-7 rounded flex-center hover:bg-background-generic data-[active=true]:bg-primary data-[active=true]:text-white'
              onClick={() => goToPage(i as number)}
            >
              {i}
            </button>
          );
        })}

        <button
          className='animated size-7 rounded flex-center hover:bg-background-generic disabled:opacity-disabled disabled:hover:bg-transparent'
          disabled={isLastPage}
          onClick={onNext}
        >
          <Icon className='rotate-180' data={ChevronLeft} />
        </button>
      </nav>
    </div>
  );
};
