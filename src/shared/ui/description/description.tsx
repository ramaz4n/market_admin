import { forwardRef, HTMLAttributes, ReactNode, useRef } from 'react';

import { Card, type CardProps } from '@gravity-ui/uikit';
import { useEventListener } from 'usehooks-ts';

import { Components } from '@/shared/types/components.ts';
import { cn } from '@/shared/utils/cn.ts';
import { digitPx } from '@/shared/utils/create-data-attr.ts';
import { mergeRefs } from '@/shared/utils/merge-refs.ts';

interface DescriptionProps extends CardProps {
  footer?: ReactNode;
  footerClassName?: string;
}
interface DescriptionItemProps extends HTMLAttributes<HTMLElement> {
  footer?: ReactNode;
  footerClassName?: string;
  label?: ReactNode;
  rootClassName?: string;
}

export const Description = forwardRef<HTMLDivElement, DescriptionProps>(
  (
    { className, footerClassName, footer, children, ...props },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLDivElement>(null);

    function onResize() {
      let max = 0;

      if (ref.current) {
        for (const c of ref.current.children) {
          if (c.firstElementChild) {
            max = Math.max(max, c.firstElementChild.clientWidth);
          }
        }

        ref.current.style.setProperty('--clamp-width', digitPx(max));
      }
    }

    useEventListener('resize', onResize);

    return (
      <Card
        ref={mergeRefs([ref, forwardedRef])}
        className={cn('flex flex-col rounded-xl py-4', className)}
        {...props}
      >
        {children}

        {Boolean(footer) && (
          <footer
            className={cn(
              'mt-4 border-t border-border px-4 pt-4',
              footerClassName,
            )}
          >
            {footer}
          </footer>
        )}
      </Card>
    );
  },
);

Description.displayName = Components.Description;

export const DescriptionItem = forwardRef<HTMLElement, DescriptionItemProps>(
  (
    {
      label,
      className,
      rootClassName,
      onClick,
      footerClassName,
      footer,
      children,
    },
    forwardedRef,
  ) => (
    <div
      className={cn('g-description-item', rootClassName, { _active: footer })}
    >
      <section
        ref={forwardedRef}
        className={cn(
          'flex min-h-9 items-center gap-2 px-4 hover:bg-background-float',
          className,
        )}
        onClick={onClick}
      >
        <div className='w-full max-w-[var(--clamp-width)] whitespace-nowrap font-medium'>
          {label}
        </div>

        <div className='g-description-item-content'>{children || '—'}</div>
      </section>

      {footer && (
        <div className={cn('g-description-item-footer', footerClassName)}>
          {footer}
        </div>
      )}
    </div>
  ),
);

DescriptionItem.displayName = Components.DescriptionItem;
