import { ReactNode } from 'react';

import {
  Breadcrumbs,
  BreadcrumbsProps,
} from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';
import { cn } from '@/shared/utils/cn.ts';

export interface AppHeaderProps {
  breadcrumbsProps?: Partial<BreadcrumbsProps>;
  headerEndContent?: ReactNode;
}

export const AppHeader = ({
  breadcrumbsProps,
  headerEndContent,
}: AppHeaderProps) => {
  const isLoadingBreadcrumbs = breadcrumbsProps?.isLoading;

  const items = breadcrumbsProps?.items || [];

  return (
    <header className={cn('sticky inset-x-0 top-0 z-50 bg-background', {})}>
      <section className='h-10 w-full border-b border-border px-3 flex-between'>
        <Breadcrumbs {...breadcrumbsProps} items={items} />

        {!isLoadingBreadcrumbs && headerEndContent}
      </section>
    </header>
  );
};
