import { useMemo } from 'react';

import { DropdownMenu, type DropdownMenuProps } from '@gravity-ui/uikit';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/shared/utils/cn.ts';

interface MenuActionsProps<T> extends DropdownMenuProps<T> {
  hidden?: boolean;
}

export const MenuActions = <T extends object>({
  items,
  hidden,
  ...props
}: MenuActionsProps<T>) => {
  if (!items?.length || hidden) return null;

  const memoizedItems = useMemo(
    () =>
      items.map((item) => {
        // eslint-disable-next-line unicorn/prefer-ternary
        if (Array.isArray(item)) {
          return item;
        } else {
          return {
            ...item,
            className: cn('min-w-52 space-x-2 min-h-8', item?.className),
          };
        }
      }),
    [items],
  );

  return (
    <Slot onClick={(e) => e.stopPropagation()}>
      <DropdownMenu items={memoizedItems} {...props} />
    </Slot>
  );
};
