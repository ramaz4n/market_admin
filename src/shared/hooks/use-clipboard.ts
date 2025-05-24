import { useState } from 'react';

export interface UseClipboard {
  onCopy?: () => void;
}

export function useClipboard(props?: UseClipboard) {
  const [error, setError] = useState<Error | null>(null);

  const onCopy = (valueToCopy?: string) => {
    if (!valueToCopy) return;
    if ('clipboard' in navigator) {
      props?.onCopy?.();
      navigator.clipboard
        .writeText(valueToCopy)
        .catch((error_) => setError(error_));
    } else {
      setError(new Error('useClipboard: navigator.clipboard is not supported'));
    }
  };

  const reset = () => {
    setError(null);
  };

  return { error, onCopy, reset };
}

export type UseClipboardReturn = ReturnType<typeof useClipboard>;
