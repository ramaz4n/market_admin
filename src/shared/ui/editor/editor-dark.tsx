/* eslint-disable unicorn/prefer-ternary */
import { memo, useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useClickAnyWhere } from 'usehooks-ts';

import {
  EDITOR_CONTENT_DARK_STYLE,
  EDITOR_OPTIONS,
} from '../../constants/editor-options.ts';

import { EditorProps } from '@/shared/ui/editor/editor.tsx';
import { cn } from '@/shared/utils/cn.ts';
import { Vld } from '@/shared/utils/form-validator.ts';

export const EditorHtmlDark = memo(
  ({
    onChange,
    rootClassName,
    label,
    name,
    rules,
    placeholder,
    init,
    ...props
  }: EditorProps) => {
    const editorRef = useRef<Editor | null>(null);
    const { control } = useFormContext();

    useClickAnyWhere(() => {
      const toolbar = document.querySelector('.tox-toolbar__overflow');

      if (!toolbar) return;

      toolbar.remove();
    });

    const getEditorOptions = () => {
      const options = {
        placeholder,
        ...EDITOR_OPTIONS,
        ...init,
      };

      options.content_style = EDITOR_CONTENT_DARK_STYLE;
      options.skin = 'oxide-dark';

      return options;
    };

    return (
      <Controller
        control={control}
        name={name}
        rules={rules instanceof Vld ? rules.build() : rules}
        render={({
          field: { onChange: controlChangeValue, value = '' },
          fieldState,
        }) => {
          const onValueChange = (currentValue: string) => {
            controlChangeValue(currentValue);
            onChange?.(name, currentValue);
          };

          return (
            <div
              className={cn(
                'text-default-text flex flex-col space-y-1.5',
                rootClassName,
              )}
            >
              {label && (
                <label
                  className='fs-sm w-fit cursor-pointer'
                  onClick={() => editorRef.current?.editor?.focus()}
                >
                  {label}
                </label>
              )}

              <Editor
                ref={editorRef}
                apiKey='p64qoydt6ad1rhxga07db7zt7188fe3c085fplodmkbcfewq'
                init={getEditorOptions()}
                value={value}
                onEditorChange={(v, editor) => {
                  if (typeof v !== 'string') return;
                  onValueChange?.(v);

                  /**
                   * Предотвращение onBeforeUnload редактора
                   * **/
                  editor?.save();
                }}
                {...props}
              />

              {fieldState.error?.message && (
                <span className='text-xs font-medium text-danger'>
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          );
        }}
      />
    );
  },
);
