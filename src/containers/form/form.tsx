import { HTMLAttributes, ReactNode, useMemo } from 'react';

import {
  type FieldValues,
  useFormContext,
  type UseFormReturn,
} from 'react-hook-form';

import { Button } from '@/shared/ui/button/button.tsx';

export interface FormPropsChildren<T> extends UseFormReturn<FieldValues> {
  getTabsErrors: (names: Array<Array<keyof T>>) => boolean[];
  isValid: boolean;
  resetButton: ReactNode;
}

interface Form<T> extends Omit<HTMLAttributes<HTMLFormElement>, 'children'> {
  children: (props: FormPropsChildren<T>) => ReactNode;
  shouldDirty?: boolean;
}

export const Form = <T extends object>({
  children,
  shouldDirty,
  ...props
}: Form<T>) => {
  const context = useFormContext();
  const dirtyValue = shouldDirty ? context.formState.isDirty : true;

  const isValid = !Object.values(context.formState.errors).length && dirtyValue;

  const getTabsErrors = (names: Array<Array<keyof T>>) => {
    if (!names) {
      throw new Error('Argument names is required');
    }

    const errorsSet = new Set(Object.keys(context.formState.errors)) as Set<
      keyof T
    >;
    const errorsMap = names.map(() => false);

    if (isValid) return errorsMap;

    for (const [i, names_] of names.entries()) {
      for (const [, part] of names_.entries()) {
        if (errorsSet.has(part)) {
          errorsMap[i] = true;
        }
      }
    }

    return errorsMap;
  };

  const resetButton = (
    <Button view='flat' onClick={() => context.reset()}>
      Отменить
    </Button>
  );

  return useMemo(
    () => (
      <form {...props}>
        {children({
          getTabsErrors,
          isValid,
          resetButton,
          ...context,
        })}
      </form>
    ),
    [context, children, isValid, resetButton, getTabsErrors, props],
  );
};
