import { useState } from 'react';

export type UseActiveDescriptionOptions<T> = {
  multiple?: boolean;
  onChange?: (current: keyof T, previous: keyof T | null) => void;
};

export const useActiveDescription = <T extends object>(
  defaultValues: T,
  options?: UseActiveDescriptionOptions<T>,
) => {
  const [values, setValues] = useState(defaultValues);

  const isMultiple = options?.multiple ?? false;
  const onChangeCallback = options?.onChange;

  const setBooleanValue = (
    name: keyof T,
    value: boolean,
    shouldOnChange = true,
  ) => {
    if (shouldOnChange) {
      onChangeCallback?.(name, getActive() as keyof T | null);
    }

    if (!isMultiple) {
      return setValues({ ...defaultValues, [name]: value });
    }
    setValues((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const toggleActive = (name: keyof T) =>
    setBooleanValue(name, !values[name as keyof T]);
  const setInactive = (name: keyof T) => setBooleanValue(name, false);
  const setActive = (name: keyof T) => setBooleanValue(name, true);

  const clear = (name?: keyof T) => {
    if (name) {
      setBooleanValue(name, false, false);
    }

    setValues(defaultValues);
  };

  const getActive = (name?: keyof T) => {
    if (name) return values[name as keyof T];

    let activeName = null;

    for (const valuesKey in values) {
      if (activeName) {
        break;
      }
      if (values[valuesKey as keyof T]) {
        activeName = valuesKey as keyof T;
      }
    }

    return activeName;
  };

  return { clear, getActive, setActive, setInactive, toggleActive, values };
};
