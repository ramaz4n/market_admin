import { ComponentProps } from 'react';

import { DatePicker as DatePickerUI } from '@gravity-ui/date-components';
import type { DateTime } from '@gravity-ui/date-utils';
import { Controller, type RegisterOptions } from 'react-hook-form';

import './locale-util.ts';
import { Formats } from '@/shared/constants/date-formats.ts';
import { Vld } from '@/shared/utils/form-validator.ts';

type BaseProps = Omit<ComponentProps<typeof DatePickerUI>, 'name' | 'onChange'>;

export interface DatePickerProps extends BaseProps {
  name: string;
  onChange?: (name: string, value: DateTime | null) => void;
  rules?: Vld | RegisterOptions;
}

export const DatePicker = ({
  hasClear = true,
  name,
  onChange,
  format = Formats.day,
  ...props
}: DatePickerProps) => (
  <Controller
    name={name}
    render={({
      field: { onChange: controlChangeValue, value, onBlur },
      fieldState,
    }) => {
      const onValueChange = (value: DateTime | null) => {
        controlChangeValue(value);
        onChange?.(name, value);
      };

      const getFieldProps = () => {
        let properties: BaseProps = { onBlur, ...props };

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

      return (
        <DatePickerUI
          format={format}
          hasClear={hasClear}
          value={value}
          onUpdate={onValueChange}
          {...getFieldProps()}
        />
      );
    }}
  ></Controller>
);
