import { ChangeEvent, ComponentProps, forwardRef } from 'react';

import { TextArea as TextAreaUI } from '@gravity-ui/uikit';
import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { cn } from '@/shared/utils/cn.ts';
import { Vld } from '@/shared/utils/form-validator.ts';
import { mergeRefs } from '@/shared/utils/merge-refs.ts';

type BaseProps = Omit<ComponentProps<typeof TextAreaUI>, 'name' | 'onChange'>;

export interface TextAreaProps extends BaseProps {
  name: string;
  maxLength?: number;
  onChange?: (name: string, value: string) => void;
  rules?: Vld | RegisterOptions;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      name,
      rules,
      maxLength,
      minRows = 4,
      hasClear = true,
      onChange,
      ...props
    },
    forwardedRef,
  ) => {
    const { control } = useFormContext();

    return (
      <Controller
        control={control}
        name={name}
        rules={rules instanceof Vld ? rules.build() : rules}
        render={({
          field: { onChange: controlChangeValue, value = '', ref, ...field },
          fieldState,
        }) => {
          const onValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
            const currentValue = event.target.value;

            controlChangeValue(currentValue);
            onChange?.(name, currentValue);
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

            if (maxLength && !props.note) {
              properties.note = `${value?.length}/${maxLength}`;
            }

            if (maxLength && !props.note && value?.length > maxLength) {
              properties.className = cn(props?.className, 'note-max-l-fulled');
            }

            if (
              properties.placeholder &&
              rules instanceof Vld &&
              rules.hasRequired()
            ) {
              properties.placeholder += '*';
            }

            return properties;
          };

          return (
            <TextAreaUI
              ref={mergeRefs([ref, forwardedRef])}
              hasClear={hasClear}
              minRows={minRows}
              value={value}
              onChange={onValueChange}
              {...getFieldProps()}
            />
          );
        }}
      />
    );
  },
);
