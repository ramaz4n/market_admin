import { useRef } from 'react';

import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import ReactQuill, { type ReactQuillProps } from 'react-quill';

import { Vld } from '../../utils/form-validator.ts';

export interface Editor extends ReactQuillProps {
  name: string;
  label?: string;
  maxHeight?: number;
  rules?: Vld | RegisterOptions;
  textChange?: (name: string, value: string, unmasked?: string) => void;
}

const EDITOR_MODULES = {
  toolbar: [
    [{ header: [1, 2, false] }], // Заголовки
    [{ font: [] }], // Шрифты
    [{ list: 'ordered' }, { list: 'bullet' }], // Списки
    ['bold', 'italic', 'underline', 'strike'], // Форматирование текста
    [{ color: [] }, { background: [] }], // Цвет текста и фона
    [{ align: [] }], // Выравнивание
    ['link', 'image', 'video'], // Вставка ссылки, изображения и видео
    ['clean'], // Кнопка очистки форматирования
  ],
};

export const Editor = ({
  name,
  rules,
  label,
  textChange,
  modules,
  ...props
}: Editor) => {
  const { control } = useFormContext();

  const quillRef = useRef<ReactQuill>(null);

  const onFocus = () => {
    if (!quillRef.current) return;

    quillRef.current.focus();
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules instanceof Vld ? rules?.build() : rules}
      render={({ field: { value, onChange, onBlur }, fieldState }) => {
        const handleChange = (value: string) => {
          textChange?.(name, value);
          onChange(value);
        };

        return (
          <div className='flex flex-col gap-y-1.5'>
            {label && (
              <label
                className='text-foreground-500 cursor-pointer text-sm font-medium'
                onClick={onFocus}
              >
                {label}
              </label>
            )}

            <ReactQuill
              {...props}
              ref={quillRef}
              modules={{ ...EDITOR_MODULES, ...modules }}
              theme='snow'
              value={value}
              onBlur={onBlur}
              onChange={handleChange}
            />

            {fieldState.error?.message && (
              <p className='pl-1 text-xs text-danger'>
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
