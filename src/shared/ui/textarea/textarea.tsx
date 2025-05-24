import { ChangeEvent, ComponentProps, forwardRef } from 'react';

import { TextArea as TextAreaUI } from '@gravity-ui/uikit';
import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { Vld } from '@/shared/utils/form-validator.ts';
import { mergeRefs } from '@/shared/utils/merge-refs.ts';

type BaseProps = Omit<ComponentProps<typeof TextAreaUI>, 'name' | 'onChange'>;

export interface TextAreaProps extends BaseProps {
  name: string;
  onChange?: (name: string, value: string) => void;
  rules?: Vld | RegisterOptions;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { name, rules, minRows = 4, hasClear = true, onChange, ...props },
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
