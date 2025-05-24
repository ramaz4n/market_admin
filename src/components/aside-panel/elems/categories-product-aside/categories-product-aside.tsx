import { Fragment } from 'react';

import { Loader, Text } from '@gravity-ui/uikit';
import { FormProvider, useForm } from 'react-hook-form';

import { CategoryProductCard } from '@/components/aside-panel/elems/categories-product-aside/category-product-card.tsx';
import { CreateProductCategoryModal } from '@/components/modals/create-product-category-modal/create-product-category-modal.tsx';
import { UpdateProductCategoryModal } from '@/components/modals/update-product-category-modal/update-product-category-modal.tsx';
import { useProductCategories } from '@/shared/hooks/api/use-product-categories.ts';
import { showModalEvent } from '@/shared/models/modal.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { DatePicker } from '@/shared/ui/date-picker/date-picker.tsx';
import { Input } from '@/shared/ui/input/input.tsx';

export const CategoriesProductAside = () => {
  const methods = useForm();

  const { isLoading, models, isFetching } = useProductCategories();

  if (isLoading) {
    return (
      <div className='size-full flex-center'>
        <Loader size='l' />
      </div>
    );
  }

  return (
    <Fragment>
      <CreateProductCategoryModal />
      <UpdateProductCategoryModal />

      <FormProvider {...methods}>
        <div className='flex size-full flex-col gap-2'>
          <div className='flex flex-col gap-2.5 px-4 pt-4'>
            <div className='w-full flex-wrap gap-2 flex-between'>
              <Text className='font-medium' variant='subheader-3'>
                Категории товаров
              </Text>

              <Button
                view='normal'
                onClick={() => showModalEvent('create-product-category')}
              >
                Создать
              </Button>
            </div>

            <div className='grid grid-cols-[1fr_auto] gap-2'>
              <Input name='name' placeholder='Найти категорию по названию' />

              <DatePicker name='createdAt' placeholder='Найти по дате' />
            </div>
          </div>

          <div className='mb-8 flex h-full flex-col gap-1 overflow-y-auto border-b border-border'>
            {models.length ? (
              models?.map((el) => (
                <CategoryProductCard
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
