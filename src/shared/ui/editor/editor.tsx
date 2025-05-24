/* eslint-disable unicorn/prefer-ternary */
import { ComponentProps, memo, ReactNode } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import { type RegisterOptions } from 'react-hook-form';

import { useTheme } from '@/shared/hooks/use-theme.ts';
import { EditorHtmlDark } from '@/shared/ui/editor/editor-dark.tsx';
import { EditorHtmlLight } from '@/shared/ui/editor/editor-light.tsx';
import { Vld } from '@/shared/utils/form-validator.ts';

export type EditorRef = Editor & {
  setHtml: (html: string) => void;
};

export interface EditorProps
  extends Omit<ComponentProps<typeof Editor>, 'onChange'> {
  name: string;
  label?: ReactNode;
  onChange?: (name: string, value: string) => void;
  placeholder?: string;
  rootClassName?: string;
  rules?: Vld | RegisterOptions;
}

const EditorHtml = memo((props: EditorProps) => {
  const [theme] = useTheme();

  const Component = theme === 'dark' ? EditorHtmlDark : EditorHtmlLight;

  return <Component {...props} />;
});

EditorHtml.displayName = 'EditorHTml';

export { EditorHtml };
