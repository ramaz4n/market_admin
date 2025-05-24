import { forwardRef, ReactNode } from 'react';

import { ArrowToggle, Card, type CardProps } from '@gravity-ui/uikit';
import { useToggle } from 'usehooks-ts';

import { Components } from '@/shared/types/components.ts';
import { cn } from '@/shared/utils/cn.ts';

interface AccordionProps extends CardProps {
  collapsedExtra?: ReactNode;
  defaultOpen?: boolean;
  header?: ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      header,
      defaultOpen = false,
      className,
      collapsedExtra,
      children,
      ...props
    }: AccordionProps,
    forwardedRef,
  ) => {
    const [isOpen, toggleIsOpen] = useToggle(defaultOpen);

    return (
      <Card
        ref={forwardedRef}
        className={cn('g-accordion', className)}
        view='filled'
        {...props}
      >
        <button className='g-accordion-header' onClick={toggleIsOpen}>
          <div className='g-accordion-header-start'>{header}</div>
          <div className='g-accordion-header-end'>
            {isOpen && (
              <div
                className='g-accordion-header-extra'
                onClick={(e) => e.stopPropagation()}
              >
                {collapsedExtra}
              </div>
            )}

            <ArrowToggle direction={isOpen ? 'top' : 'bottom'} />
          </div>
        </button>

        <div className={cn('g-accordion-content', { hidden: !isOpen })}>
          {children}
        </div>
      </Card>
    );
  },
);

Accordion.displayName = Components.Accordion;
