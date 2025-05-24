import { HTMLAttributes, ReactNode } from 'react';

import { Xmark } from '@gravity-ui/icons';
import {
  Modal as ModalUI,
  type ModalProps as ModalPropsUI,
  Text,
} from '@gravity-ui/uikit';
import { useStoreMap } from 'effector-react';

import {
  $modal,
  hideModalEvent,
  ModalName,
  ModalStore,
} from '@/shared/models/modal.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { cn } from '@/shared/utils/cn.ts';

export enum ModalSize {
  fit = 'g-modal-size-fit',
  l = 'g-modal-size-l',
  m = 'g-modal-size-m',
  s = 'g-modal-size-s',
}

interface ModalProps extends Omit<ModalPropsUI, 'onClose'> {
  name: ModalName;
  onClose?: (name: ModalName) => void;
  size?: 's' | 'm' | 'l' | 'fit';
  title?: ReactNode;
}

function hasName(store: ModalStore, name: ModalName) {
  if (!store) return false;

  return store.has(name);
}

export const Modal = ({
  name,
  title,
  className,
  children,
  onClose,
  size = 'm',
  contentClassName,
  ...props
}: ModalProps) => {
  const isVisible = useStoreMap($modal, (s) => hasName(s, name));

  const onCloseModal = () => {
    hideModalEvent(name);
    onClose?.(name);
  };

  return (
    <ModalUI
      className={cn(ModalSize[size], className)}
      contentClassName={cn('p-4 w-full', contentClassName)}
      open={isVisible}
      onClose={onCloseModal}
      {...props}
    >
      <div className='mb-2.5 flex-between'>
        <Text variant='subheader-3'>{title}</Text>

        <Button
          className='clamp-7 flex-center'
          size='s'
          view='normal'
          onClick={onCloseModal}
        >
          <Xmark />
        </Button>
      </div>

      <section className='space-y-2.5'>{children}</section>
    </ModalUI>
  );
};

export const ModalFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex items-center justify-end gap-2', className)}
    {...props}
  />
);
