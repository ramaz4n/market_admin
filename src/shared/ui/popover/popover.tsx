import { ComponentProps, ReactNode, useRef } from 'react';

import { Popup } from '@gravity-ui/uikit';
import { Slot } from '@radix-ui/react-slot';
import { useBoolean } from 'usehooks-ts';

interface PopoverPrimitiveProps extends ComponentProps<typeof Popup> {
  content: ReactNode;
  isOpen?: boolean;
  onValueChange?: (v: boolean) => void;
}

export interface PopoverProps extends PopoverPrimitiveProps {
  control?: boolean;
}

export const PopoverPrimitive = ({
  children,
  content,
  ...props
}: PopoverPrimitiveProps) => {
  const ref = useRef(null);
  const control = useBoolean(false);

  return (
    <>
      <Slot ref={ref} onClick={control.toggle}>
        {children}
      </Slot>

      <Popup
        anchorRef={ref}
        open={control.value}
        onOutsideClick={control.setFalse}
        {...props}
      >
        {content}
      </Popup>
    </>
  );
};

export const PopoverControl = ({
  children,
  content,
  isOpen = false,
  onValueChange,
  ...props
}: PopoverPrimitiveProps) => {
  const ref = useRef(null);

  return (
    <>
      <Slot ref={ref} onClick={() => onValueChange?.(!isOpen)}>
        {children}
      </Slot>

      <Popup
        anchorRef={ref}
        open={isOpen}
        onOutsideClick={() => onValueChange?.(!isOpen)}
        {...props}
      >
        {content}
      </Popup>
    </>
  );
};

export const Popover = ({
  control,
  placement = 'bottom',
  ...props
}: PopoverProps) => {
  const Component = control ? PopoverControl : PopoverPrimitive;

  return <Component placement={placement} {...props} />;
};
