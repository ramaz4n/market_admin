import type { HTMLAttributes } from 'react';

import styles from './spinner.module.css';

import { cn } from '@/shared/utils/cn';
import { createCssVar } from '@/shared/utils/create-css-var';
interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const Spinner = ({ className, size, style, ...props }: SpinnerProps) => (
  <div
    className={cn(styles.spinner, className)}
    style={{ ...createCssVar('spinner-size', size), ...style }}
    {...props}
  />
);
