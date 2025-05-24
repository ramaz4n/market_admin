import { ComponentProps } from 'react';

import { Select as SelectUI } from '@gravity-ui/uikit';
import { Controller, type RegisterOptions } from 'react-hook-form';

import { Vld } from '@/shared/utils/form-validator.ts';

type BaseProps = Omit<ComponentProps<typeof SelectUI>, 'name' | 'onChange'>;

export interface SelectProps extends BaseProps {
  name: string;
  onChange?: (name: string, value: string[]) => void;
  rules?: Vld | RegisterOptions;
}

export const Select = ({
  hasClear = true,
  filterable = true,
  name,
  onChange,
  rules,
  ...props
}: SelectProps) => (
  <Controller
    name={name}
    rules={rules instanceof Vld ? rules.build() : rules}
    render={({
      field: { onChange: controlChangeValue, value = [], ...field },
      fieldState,
    }) => {
      const onValueChange = (values: string[]) => {
        const currentValue = values;

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

      const currentValue = () => {
        if (!value) return [];

        if (Array.isArray(value)) {
          return value;
        }

        return [value];
      };

      return (
        <SelectUI
          filterable={filterable}
          hasClear={hasClear}
          value={currentValue()}
          width='max'
          onUpdate={onValueChange}
          {...getFieldProps()}
        />
      );
    }}
  />
);
