import { forwardRef, Fragment } from 'react';

import {
  Button as ButtonUI,
  type ButtonProps as ButtonsPropsUI,
  Loader,
  Tooltip,
  type TooltipProps,
} from '@gravity-ui/uikit';

import { Components } from '@/shared/types/components.ts';

export interface ButtonProps extends ButtonsPropsUI {
  asChild?: boolean;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, view = 'action', isLoading, disabled, ...props },
    forwardedRef,
  ) => (
    <ButtonUI
      disabled={disabled || isLoading}
      view={view}
      {...props}
      ref={forwardedRef}
    >
      {isLoading ? (
        <Fragment>
          <Loader className='pos-abs [&>div]:bg-white' size='s' />
          <Loader className='invisible' size='s' />
        </Fragment>
      ) : (
        children
      )}
    </ButtonUI>
  ),
);

Button.displayName = Components.Button;

export const TooltipButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & { tooltipProps: Omit<TooltipProps, 'children'> }
>(({ tooltipProps, ...props }, forwardedRef) => (
  <Tooltip openDelay={250} placement='bottom' {...tooltipProps}>
    <Button {...props} ref={forwardedRef} />
  </Tooltip>
));

TooltipButton.displayName = Components.TooltipButton;
