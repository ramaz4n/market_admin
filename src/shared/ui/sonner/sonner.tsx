/* eslint-disable tailwindcss/no-contradicting-classname */
import { type ComponentProps } from 'react';

import { Xmark } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';
import { ExternalToast, toast, Toaster as Sonner } from 'sonner';

import { Button } from '@/shared/ui/button/button.tsx';
import { cn } from '@/shared/utils/cn.ts';

export const REMOVE_TOAST_DURATION = 5001;

export const ToastOptions = {
  error: {
    color: 'danger',
    title: 'Ошибка',
  },
  success: {
    color: 'success',
    title: 'Успешно',
  },
};

type ToasterProps = ComponentProps<typeof Sonner>;
export type ToasterRemoveProps = {
  message: string;
  onRemove: () => void;
  onCancel?: (toastId: number) => void;
};

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className='toaster group [&>li]:w-full [&>li]:rounded-2xl'
    theme='light'
    visibleToasts={6}
    {...props}
  />
);

const toaster = (
  message: string,
  type?: 'success' | 'error',
  options?: ExternalToast,
) => {
  const { title, color } = ToastOptions[type || 'success'];

  return toast.custom(
    (id) => (
      <div
        className={cn(
          'group/toast relative min-h-12 w-full flex-col gap-1 rounded-lg border border-border bg-background px-3.5 py-1.5 text-foreground shadow-2xl backdrop-blur first-of-type:flex',
          color,
        )}
      >
        <span className={cn('text-sm font-medium')}>{title}</span>

        <p className='text-xs font-medium text-zinc-500'>{message}</p>

        <button
          className='animated absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 rounded-full bg-background text-foreground-text opacity-0 ring-1 ring-border clamp-5 flex-center group-hover/toast:opacity-100'
          onClick={() => toast.dismiss(id)}
        >
          <Icon data={Xmark} />
        </button>
      </div>
    ),
    options,
  );
};

toaster.remove = (
  { message, onRemove, onCancel }: ToasterRemoveProps,
  options?: ExternalToast,
) =>
  toast.custom(
    (id) => (
      <div
        className={cn(
          'group/toast relative flex min-h-12 w-full flex-col gap-1 rounded-md border border-border bg-background px-3.5 py-1.5',
        )}
      >
        <div className='flex-between'>
          <span className={cn('text-sm font-medium')}>Удаление</span>

          <Button
            view='flat'
            onClick={() => {
              onCancel?.(id as number);
              toast.dismiss(id);
            }}
          >
            Отмена
          </Button>
        </div>

        <p className='mt-0.5 text-xs text-secondary-text'>{message}</p>

        <div className='mt-2 h-2.5 w-full rounded-full bg-background'>
          <div
            className='h-full animate-toast rounded-full bg-danger'
            onAnimationEnd={() => {
              onRemove();
              toast.dismiss(id);
            }}
          />
        </div>
      </div>
    ),
    { ...options, duration: REMOVE_TOAST_DURATION, position: 'top-right' },
  );

export { Toaster, toaster };
