/* eslint-disable react/no-unescaped-entities */
import { ComponentProps, useEffect, useRef } from 'react';

import { Select as SelectUI, type SelectOption } from '@gravity-ui/uikit';
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
  options = [],
  onChange,
  rules,
  ...props
}: SelectProps) => {
  const optionsHistoryRef = useRef<SelectOption[]>(options as SelectOption[]);

  useEffect(() => {
    if (!props.onFilterChange) return;

    const map: Map<string, SelectOption> = new Map([]);

    for (const item of [
      ...optionsHistoryRef.current,
      ...options,
    ] as SelectOption[]) {
      map.set(item.value, item);
    }

    optionsHistoryRef.current = [...map.values()];
  }, [options, props.onFilterChange]);

  return (
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

          if (filterable && props?.onFilterChange) {
            properties.renderSelectedOption = (option: SelectOption) => {
              const item = optionsHistoryRef.current.find(
                (el) => el.value === option.value,
              );

              return <span>{item?.children || option.value}</span>;
            };

            properties.filterOption = () => true;
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
            options={options}
            renderEmptyOptions={() => <span>Ничего не найдено</span>}
            value={currentValue()}
            width='max'
            onUpdate={onValueChange}
            {...getFieldProps()}
          />
        );
      }}
    />
  );
};
