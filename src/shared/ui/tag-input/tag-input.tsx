/* eslint-disable unicorn/prefer-ternary */
import { ComponentProps, forwardRef, useRef } from 'react';

import { CirclePlus } from '@gravity-ui/icons';
import { Button, Icon, Label, TextInput } from '@gravity-ui/uikit';
import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { useEventListener } from 'usehooks-ts';

import { Vld } from '@/shared/utils/form-validator.ts';
import { mergeRefs } from '@/shared/utils/merge-refs.ts';

type BaseProps = Omit<ComponentProps<typeof TextInput>, 'name' | 'onChange'>;

export interface TagInputProps extends BaseProps {
  name: string;
  onChange?: (name: string, value: string[]) => void;
  rules?: Vld | RegisterOptions;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ name, rules, hasClear = true, onChange, ...props }, forwardedRef) => {
    const { control, setValue, getValues } = useFormContext();
    const domRef = useRef<HTMLInputElement>(null);

    const afterSaveEvent = () => {
      if (!domRef.current) return;

      domRef.current.value = '';
      domRef.current.focus();
    };

    const buildList = (string: string, value: string[]) => {
      let list: string[] = [];

      if (!string) return list;

      if (value) {
        if (Array.isArray(value)) {
          if (new Set(value).has(string)) {
            return value;
          }
          list = [...value, string];
        }
      } else {
        list = [string];
      }

      return list;
    };

    useEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Enter') {
          if (!domRef.current) return;
          e.preventDefault();

          const value = getValues(name) ?? [];
          const currentValue = domRef.current.value;

          if (!currentValue || !value || !Array.isArray(value)) return;

          const list = buildList(currentValue, value) ?? [];

          setValue(name, list);
          onChange?.(name, list);

          afterSaveEvent();
        }
      },
      domRef,
    );

    return (
      <Controller
        control={control}
        name={name}
        rules={rules instanceof Vld ? rules.build() : rules}
        render={({
          field: { onChange: controlChangeValue, value = [], ref, ...field },
          fieldState,
        }) => {
          const onSave = () => {
            if (!domRef.current) return;

            const currentValue = domRef.current.value;

            if (!currentValue) return;

            const list = buildList(currentValue, value) ?? [];

            controlChangeValue(list);
            onChange?.(name, list);

            afterSaveEvent();
          };

          const getFieldProps = () => {
            let properties: BaseProps = { ...props, ...field };

            if (fieldState.error?.message) {
              properties = {
                errorMessage: (
                  <span className='text-xs'>{fieldState.error?.message}</span>
                ),
                errorPlacement: 'outside',
                validationState: 'invalid',
              };
            }

            delete properties.label;

            return properties;
          };

          const onRemove = (index: number) => {
            if (!value || !Array.isArray(value)) return;

            const list: string[] = value.filter((_, i) => i !== index);

            controlChangeValue(list);
            onChange?.(name, list);
          };

          return (
            <div>
              <TextInput
                controlRef={mergeRefs([domRef, ref, forwardedRef])}
                hasClear={hasClear}
                controlProps={{
                  className: 'g-text-input-tags',
                }}
                endContent={
                  <Button
                    className='max-lg:gap-0'
                    pin='round-brick'
                    onClick={onSave}
                  >
                    <Icon data={CirclePlus} />
                    <span className='max-lg:hidden'>Добавить</span>
                  </Button>
                }
                {...getFieldProps()}
              />

              {value && Array.isArray(value) && !!value.length && (
                <div className='mt-2 flex flex-wrap items-center gap-1.5'>
                  {(value as string[]).map((tag, index) => (
                    <Label
                      key={tag}
                      size='s'
                      type='close'
                      onCloseClick={() => onRemove(index)}
                    >
                      {tag}
                    </Label>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      />
    );
  },
);
