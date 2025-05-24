import {
  Breadcrumbs as BreadcrumbsUI,
  type BreadcrumbsProps as BreadcrumbsPropsUI,
  FirstDisplayedItemsCount,
  LastDisplayedItemsCount,
  Skeleton,
} from '@gravity-ui/uikit';
import { Link } from 'react-router-dom';

import { LINKS } from '@/shared/constants/links.ts';
import { cn } from '@/shared/utils/cn.ts';

export interface BreadcrumbsProps
  extends Omit<
    BreadcrumbsPropsUI,
    'firstDisplayedItemsCount' | 'lastDisplayedItemsCount'
  > {
  enabledStartLink?: boolean;
  isLoading?: boolean;
  skeletonCount?: number;
}

export const Breadcrumbs = ({
  items,
  isLoading,
  skeletonCount = 3,
  enabledStartLink,
}: BreadcrumbsProps) => {
  if (!items || !items?.length) return null;

  const list = (() => {
    if (enabledStartLink) {
      return items;
    }

    return [{ href: LINKS.home, text: 'Главная' }, ...items];
  })();

  if (isLoading) {
    return (
      <div className='g-breadcrumbs__inner'>
        {Array.from({ length: skeletonCount }).map((_, key) => (
          <Skeleton key={key} className='h-4 max-w-28' />
        ))}
      </div>
    );
  }

  return (
    <BreadcrumbsUI
      firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
      items={list}
      lastDisplayedItemsCount={LastDisplayedItemsCount.One}
      renderItem={({ item, isCurrent }) =>
        item.href ? (
          <Link
            to={item.href}
            className={cn({
              'animated whitespace-nowrap text-secondary-text hover:text-primary':
                !isCurrent,
            })}
          >
            {item.text}
          </Link>
        ) : (
          <span className='whitespace-nowrap'>{item.text}</span>
        )
      }
    />
  );
};
