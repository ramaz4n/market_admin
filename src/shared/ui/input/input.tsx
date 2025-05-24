import { ChangeEvent, ComponentProps, forwardRef } from 'react';

import { TextInput } from '@gravity-ui/uikit';
import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { Mask } from '@/shared/types/mask.ts';
import { Vld } from '@/shared/utils/form-validator.ts';
import { maskito } from '@/shared/utils/maskito.ts';
import { mergeRefs } from '@/shared/utils/merge-refs.ts';

type BaseProps = Omit<ComponentProps<typeof TextInput>, 'name' | 'onChange'>;

export interface InputProps extends BaseProps {
  name: string;
  mask?: Mask;
  onChange?: (name: string, value: string) => void;
  rules?: Vld | RegisterOptions;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { name, mask, rules, hasClear = true, onChange, ...props },
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
          const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
            let currentValue = event.target.value;

            if (mask) {
              currentValue = maskito.format(currentValue);
            }

            controlChangeValue(currentValue);
            onChange?.(name, currentValue);
          };

          const getFieldProps = () => {
            let properties: BaseProps = { ...props, ...field };

            if (fieldState.error?.message) {
              properties = Object.assign(properties, {
                errorMessage: (
                  <span className='text-xs'>{fieldState.error?.message}</span>
                ),
                errorPlacement: 'outside',
                validationState: 'invalid',
              });
            }

            delete properties.label;

            return properties;
          };

          return (
            <TextInput
              ref={mergeRefs([ref, forwardedRef])}
              hasClear={hasClear}
              value={value ?? ''}
              onChange={onValueChange}
              {...getFieldProps()}
            />
          );
        }}
      />
    );
  },
);
