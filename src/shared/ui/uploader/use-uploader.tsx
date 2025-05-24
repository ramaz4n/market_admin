import { MouseEvent, useId, useRef } from 'react';

import { useFormContext } from 'react-hook-form';

import { UploaderProps } from '@/shared/ui/uploader/types.ts';

export const useUploader = (props: UploaderProps) => {
  const { isDisabled } = props;

  const { control } = useFormContext();
  const id = useId();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!inputRef.current || isDisabled) return;

    inputRef.current.click();
  };

  return {
    control,
    handleFocus,
    id,
    inputRef,
    isDisabled,
    ...props,
  };
};
