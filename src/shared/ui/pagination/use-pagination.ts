import { useMemo } from 'react';

import { PaginationProps } from '@/shared/ui/pagination/pagination.tsx';

export const DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  last_page = 0,
  siblingCount = 1,
  page = 1,
  onChange,
  ...props
}: PaginationProps) => {
  // const { updateUrlSearchParams, urlSearchObjectParams, deleteSearchParams } =
  //   useGetParams();

  const isFirstPage = page === 1;
  const isLastPage = page === last_page;

  const onPrev = () => goToPage(page - 1);
  const onNext = () => goToPage(page + 1);

  const goToPage = (page: number) => onChange(page);

  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + page + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..lastPage]
    */
    if (last_page <= 8 || totalPageNumbers >= last_page) {
      return range(1, last_page);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and lastPage
    */
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, last_page);

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and lastPage. Hence, we are using leftSiblingIndex > 2 and rightSiblingIndex < lastPage - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < last_page - 2;

    const firstPageIndex = 1;
    const lastPageIndex = last_page;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, last_page];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(last_page - rightItemCount + 1, last_page);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [page, last_page, siblingCount]);

  return {
    goToPage,
    isFirstPage,
    isLastPage,
    onNext,
    onPrev,
    page,
    paginationRange,
    ...props,
  };
};
