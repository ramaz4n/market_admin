import { InputHTMLAttributes, ReactNode } from 'react';

import { type RegisterOptions } from 'react-hook-form';

import { Slot } from '@/shared/types/globals.ts';
import { ButtonProps } from '@/shared/ui/button/button.tsx';

export interface UploaderProps {
  name: string;
  accept?: boolean;
  className?: HTMLDivElement['className'];
  classNames?: Slot<'list'>;
  extensionOptions?: ExtensionOptions;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  isDisabled?: boolean;
  label?: ReactNode;
  multiple?: boolean;
  onChange?: (name: string, files: File[]) => void;
  onDefaultFileRemove?: (id: number) => void;
  onPreviewRemove?: (file: File) => void;
  renderUploadFile?: (
    file: File,
    index: number,
    onFileRemove: (file: File, index: number) => void,
  ) => ReactNode;
  rules?: RegisterOptions;
  showUploadList?: boolean;
  sizeOptions?: SizeOptions;
  tooltip?: boolean | TooltipCallback;
  uploadButtonProps?: ButtonProps;
}

export type TooltipCallback = (file: File) => ReactNode;

export type ExtensionOptions = {
  list: string[];
  onError?: (files: File[]) => void;
};

export type SizeOptions = {
  value: number;
  onError?: (files: File[]) => void;
};

export type FileArray = Array<File>;
