import { PropsWithChildren } from 'react';

import { Loader } from '@gravity-ui/uikit';
import { useUnit } from 'effector-react';

import {
  AppHeader,
  AppHeaderProps,
} from '@/components/app-header/app-header.tsx';
import { $auth } from '@/shared/models/auth.ts';
import { cn } from '@/shared/utils/cn.ts';

interface PageLayoutProps extends PropsWithChildren<AppHeaderProps> {
  className?: string;
  isLoading?: boolean;
}

export const PageLayout = ({
  children,
  isLoading,
  className,
  ...props
}: PageLayoutProps) => {
  const isAuthorized = useUnit($auth);

  if (!isAuthorized) return children;

  return (
    <>
      <AppHeader {...props} />

      {isLoading ? (
        <div className='pos-abs'>
          <div className='translate-x-[var(--gn-aside-header-size)]'>
            <Loader size='l' />
          </div>
        </div>
      ) : (
        <main className={cn('p-4', className)}>{children}</main>
      )}
    </>
  );
};
