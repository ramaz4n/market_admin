import { useEffect } from 'react';

import { Copy } from '@gravity-ui/icons';
import { Divider, Icon, Text } from '@gravity-ui/uikit';
import { FormProvider, useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';

import { PageLayout } from '@/containers/page-layout/page-layout.tsx';
import { userApi } from '@/shared/api/user.ts';
import { Formats } from '@/shared/constants/date-formats.ts';
import { Masks } from '@/shared/constants/masks.ts';
import { USER_ROLE_LIST } from '@/shared/constants/user-role-icon.ts';
import { useProfile } from '@/shared/hooks/api/use-profile.ts';
import { useClipboard } from '@/shared/hooks/use-clipboard.ts';
import { UserProps } from '@/shared/types/api/user.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { Select } from '@/shared/ui/select/select.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { DEBOUNCE_DELAY } from '@/shared/ui/table/use-table.tsx';
import { dater } from '@/shared/utils/dater.ts';

export const ProfilePage = () => {
  const methods = useForm();
  const { model, isLoading } = useProfile();

  const clipboardApi = useClipboard({
    onCopy: () => toaster('Id скопирован'),
  });

  const onFieldChange = useDebounceCallback(
    async (name: string, value: string | string[]) => {
      if (!model?.id) return;

      function getValue() {
        if (name === 'phone' && typeof value === 'string') {
          return value.replace(/\D/g, '');
        }

        if (Array.isArray(value)) {
          return value[0];
        }

        return value;
      }

      const values: { subject: Partial<UserProps> } = {
        subject: {
          [name as keyof UserProps]: getValue(),
        },
      };

      await userApi.updateProfile(values, model?.id.toString());
    },
    DEBOUNCE_DELAY,
  );

  useEffect(() => {
    if (model) {
      for (const modelKey in model) {
        methods.setValue(modelKey, model[modelKey as keyof UserProps]);
      }
    }
  }, [model]);

  return (
    <FormProvider {...methods}>
      <PageLayout
        className='space-y-4'
        isLoading={isLoading}
        breadcrumbsProps={{
          items: [{ href: '', text: 'Мой профиль' }],
        }}
      >
        <div className='flex-between'>
          <div className='flex flex-col'>
            <Text variant='header-2'>Мой профиль</Text>

            <Text className='text-secondary-text'>
              Аккаунт создан{' '}
              {dater.toString(model?.created_at, Formats.full_w_d)}
            </Text>
          </div>

          {model?.id && (
            <Button
              size='l'
              view='normal'
              onClick={() => clipboardApi.onCopy(model?.id.toString())}
            >
              Мой ID: <span className='font-bold'>{model?.id}</span>
              <Icon data={Copy} />
            </Button>
          )}
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <Divider align='center' className='mb-2.5 lg:mb-6'>
              Общее
            </Divider>
            <div className='flex grid-cols-3 flex-col gap-4 lg:grid'>
              <Input
                name='first_name'
                placeholder='Имя не указано'
                onChange={onFieldChange}
              />

              <Input
                name='last_name'
                placeholder='Фамилия не указана'
                onChange={onFieldChange}
              />

              <Select
                disabled
                filterable={false}
                name='role'
                options={USER_ROLE_LIST}
                placeholder='Укажите роль'
                onChange={onFieldChange}
              />
            </div>

            <Divider align='center' className='my-2.5 lg:my-6'>
              Контакты
            </Divider>

            <div className='flex grid-cols-3 flex-col gap-4 lg:grid'>
              <Input
                mask={Masks.phone}
                name='phone'
                placeholder='Телефон не указан'
                onChange={onFieldChange}
              />

              <Input
                name='email'
                placeholder='Email не указан'
                onChange={onFieldChange}
              />
            </div>
          </div>
        </div>
      </PageLayout>
    </FormProvider>
  );
};
