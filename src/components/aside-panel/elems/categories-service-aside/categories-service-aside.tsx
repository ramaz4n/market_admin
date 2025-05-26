import { Fragment } from 'react';

import { Plus } from '@gravity-ui/icons';
import { Icon, Loader, Text } from '@gravity-ui/uikit';
import { FormProvider, useForm } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';

import { CategoryServiceCard } from '@/components/aside-panel/elems/categories-service-aside/category-service-card.tsx';
import { CreateServiceCategoryModal } from '@/components/modals/create-service-category-modal/create-service-category-modal.tsx';
import { UpdateServiceCategoryModal } from '@/components/modals/update-service-category-modal/update-service-category-modal.tsx';
import { useServiceCategories } from '@/shared/hooks/api/use-service-categories.ts';
import { showModalEvent } from '@/shared/models/modal.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Input } from '@/shared/ui/input/input.tsx';

export const CategoriesServiceAside = () => {
  const methods = useForm();

  const [debounceNameValue] = useDebounceValue<string>(
    methods.watch('name'),
    500,
  );

  const { isLoading, models, isFetching } = useServiceCategories({
    name: debounceNameValue,
  });

  if (isLoading) {
    return (
      <div className='size-full flex-center'>
        <Loader size='l' />
      </div>
    );
  }

  return (
    <Fragment>
      <CreateServiceCategoryModal />
      <UpdateServiceCategoryModal />

      <FormProvider {...methods}>
        <div className='flex size-full flex-col gap-2'>
          <div className='flex flex-col gap-2.5 px-4 pt-4'>
            <div className='w-full flex-wrap gap-2 flex-between'>
              <Text className='font-medium' variant='subheader-3'>
                Категории услуг
              </Text>

              <Button
                view='normal'
                onClick={() => showModalEvent('create-service-category')}
              >
                <Icon data={Plus} />
                Создать
              </Button>
            </div>

            <Input name='name' placeholder='Найти категорию по названию' />
          </div>

          <div className='mb-8 flex h-full flex-col gap-1 overflow-y-auto border-b border-border'>
            {models.length ? (
              models?.map((el) => (
                <CategoryServiceCard
                  isFetching={isFetching}
                  {...el}
                  key={el.id}
                />
              ))
            ) : (
              <div className='flex items-center justify-center gap-2 text-sm'>
                <img
                  alt='No data'
                  className='size-fit'
                  src='/images/empty-data.svg'
                />
                <div className='flex flex-col items-start gap-3.5'>
                  <Text variant='subheader-3'>Категории не найдены</Text>

                  <Text className='max-w-72 text-start text-secondary-text'>
                    Попробуйте изменить условия или сбросить настройки фильтра.
                  </Text>

                  <Button view='normal' onClick={console.log}>
                    Сбросить фильтры
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </FormProvider>
    </Fragment>
  );
};
