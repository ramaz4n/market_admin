import { useCallback } from 'react';

import { ExternalToast, useSonner } from 'sonner';

import {
  REMOVE_TOAST_DURATION,
  toaster,
  ToasterRemoveProps,
} from '@/shared/ui/sonner/sonner.tsx';

export const useDeleteCallback = () => {
  const { toasts } = useSonner();
  const isSome = toasts.some(
    (toast) => toast.duration === REMOVE_TOAST_DURATION,
  );

  return useCallback(
    (props: ToasterRemoveProps, options?: ExternalToast) => {
      if (!isSome) return toaster.remove(props, options);
    },
    [isSome],
  );
};
