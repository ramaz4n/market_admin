import { Fragment } from 'react';

import { Text } from '@gravity-ui/uikit';
import { FormProvider } from 'react-hook-form';

import { Form } from '@/containers/form/form.tsx';
import { useAuthPage } from '@/pages/auth/auth-page/use-auth-page.ts';
import { REGEXP } from '@/shared/constants/regex.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { vld } from '@/shared/utils/form-validator.ts';

export const AuthPage = () => {
  const { methods, mutation, onSubmit } = useAuthPage();

  return (
    <FormProvider {...methods}>
      <Form
        className='flex h-fit w-full max-w-form flex-col gap-y-3 rounded-lg p-6'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {({ isValid }) => (
          <Fragment>
            <Text className='text-foreground-text mb-2' variant='display-1'>
              Авторизация
            </Text>

            <Input
              autoComplete='email'
              name='email'
              placeholder='Почта'
              rules={vld().required('Почта').pattern(REGEXP.email)}
              type='email'
            />

            <Input
              name='password'
              placeholder='Пароль'
              rules={vld().required('Пароль').minLength(6)}
              type='password'
            />

            <Button
              className='w-full'
              disabled={!isValid}
              isLoading={mutation.isPending}
              type='submit'
              onClick={methods.handleSubmit(onSubmit)}
            >
              Войти
            </Button>
          </Fragment>
        )}
      </Form>
    </FormProvider>
  );
};
