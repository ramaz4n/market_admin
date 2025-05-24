import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn.ts';

interface AsidePanel extends HTMLAttributes<HTMLDivElement> {}

export const AsidePanel = forwardRef<HTMLDivElement, AsidePanel>(
  ({ className, children, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={cn('h-full max-w-96 p-4 lg:min-w-96', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
