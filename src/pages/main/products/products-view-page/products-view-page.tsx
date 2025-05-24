import { ComponentProps, useEffect } from 'react';

import { Copy, PencilToLine, TrashBin } from '@gravity-ui/icons';
import { Icon, Label, Text } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { UpdateProductModal } from '@/components/modals/update-product-modal/update-product-modal.tsx';
import { PageLayout } from '@/containers/page-layout/page-layout.tsx';
import { queryClient } from '@/main.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { Formats } from '@/shared/constants/date-formats.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { PRODUCT_STATUS } from '@/shared/constants/product-status-options.ts';
import { useProduct } from '@/shared/hooks/api/use-product.ts';
import {
  formatCategories,
  useProductCategories,
} from '@/shared/hooks/api/use-product-categories.ts';
import { useClipboard } from '@/shared/hooks/use-clipboard.ts';
import { showModalEvent } from '@/shared/models/modal.ts';
import {
  ProductProps,
  ProductUpdateProps,
} from '@/shared/types/api/products.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { TableNames } from '@/shared/types/table.ts';
import { Button, TooltipButton } from '@/shared/ui/button/button.tsx';
import {
  Description,
  DescriptionItem,
} from '@/shared/ui/description/description.tsx';
import { useActiveDescription } from '@/shared/ui/description/use-active-description.ts';
import { Input } from '@/shared/ui/input/input.tsx';
import { Select } from '@/shared/ui/select/select.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { Textarea } from '@/shared/ui/textarea/textarea.tsx';
import { dater } from '@/shared/utils/dater.ts';
type LabelTheme = ComponentProps<typeof Label>['theme'];

export const ProductsViewPage = () => {
  const productApi = useProduct();

  const methods = useForm<ProductUpdateProps>({
    defaultValues: {
      description: '',
      features: '',
      name: '',
      price: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const articleClipboard = useClipboard({
    onCopy: () => {
      toaster('Скопировано');
    },
  });

  const categoriesApi = useProductCategories();

  const descriptionControl = useActiveDescription({
    categories: false,
    description: false,
    features: false,
    price: false,
    status: false,
  });

  const mutation = useMutation({
    mutationFn: productsApi.update,
    onSuccess: async () => {
      // return apiErrorParse(
      //   { name: ['this name is has been used'] },
      //   { setError: methods.setError },
      // );

      await Promise.all([
        queryClient.refetchQueries({ queryKey: [TableNames.PRODUCTS] }),
        queryClient.refetchQueries({ queryKey: [QueryKeys.PRODUCT_VIEW] }),
      ]);
    },
  });

  const onSaveModelFields = (name: keyof typeof descriptionControl.values) => {
    let value = methods.getValues(name);

    if (name === 'status' && Array.isArray(value) && value.length) {
      value = value[0];
    }

    if (name === 'status' && !value?.length) {
      methods.setError(name, {
        message: 'Статус не может быть пустым',
      });

      return;
    }

    if (name === 'categories' && !value?.length) {
      methods.setError(name, {
        message: 'Категории не могут быть пустыми',
      });

      return;
    }

    mutation.mutate({ [name]: value } as Partial<ProductUpdateProps>);
  };

  const onCancelSaveMeta = (name: keyof typeof descriptionControl.values) => {
    if (!productApi.model) return;

    methods.setValue(
      name as keyof ProductUpdateProps,
      productApi.model[name as keyof Omit<ProductProps, 'categories'>],
    );
    methods.setValue(
      'categories',
      productApi.model.categories.map((el) => el.id?.toString()),
    );
    methods.clearErrors();
    descriptionControl.setInactive(name);
  };

  useEffect(() => {
    if (productApi?.model) {
      const { name, description, status, price, features, categories } =
        productApi.model;

      methods.setValue('name', name);
      methods.setValue('description', description);
      methods.setValue('price', price);
      methods.setValue('features', features);
      methods.setValue(
        'categories',
        categories.map(({ id }) => id?.toString()),
      );

      methods.setValue('status', String(status || 0) as unknown as undefined);
    }
  }, [productApi?.model]);

  return (
    <FormProvider {...methods}>
      <PageLayout
        className='space-y-4'
        isLoading={productApi.isLoading}
        breadcrumbsProps={{
          isLoading: productApi.isLoading,
          items: [
            { href: LINKS.products(), text: 'Все товары' },
            { href: '', text: productApi.model?.name ?? '' },
          ],
        }}
        headerEndContent={
          <Button onClick={() => showModalEvent('update-product')}>
            <Icon data={PencilToLine} />
            Редакитировать
          </Button>
        }
      >
        <UpdateProductModal />

        <div className='flex grid-cols-2 flex-col gap-4 lg:grid'>
          <div className='space-y-4'>
            <Text variant='header-2'>{productApi.model?.name}</Text>

            <Description>
              <DescriptionItem
                className='g-description-item-flexible g-description-item-flexbetween'
                label='Id'
              >
                <span> {productApi.model?.id}</span>

                <Button view='flat-danger'>
                  <Icon data={TrashBin} />
                  Удалить
                </Button>
              </DescriptionItem>

              <DescriptionItem
                className='g-description-item-flexible'
                label='Цена'
                footer={
                  descriptionControl.values.price && (
                    <div>
                      <Input name='price' placeholder='Введите цену' />

                      <div className='mt-2 gap-2 flex-between button:grow'>
                        <Button
                          view='normal'
                          onClick={() => onCancelSaveMeta('price')}
                        >
                          Отменить
                        </Button>

                        <Button
                          isLoading={mutation.isPending}
                          onClick={() => onSaveModelFields('price')}
                        >
                          Сохранить
                        </Button>
                      </div>
                    </div>
                  )
                }
                onClick={() => descriptionControl.toggleActive('price')}
              >
                {productApi.model?.price}
              </DescriptionItem>

              <DescriptionItem label='Артикул'>
                <TooltipButton
                  size='s'
                  tooltipProps={{ content: 'Скопировать' }}
                  view='normal'
                  onClick={() =>
                    articleClipboard.onCopy(productApi.model?.article)
                  }
                >
                  <Icon data={Copy} />

                  {productApi.model?.article}
                </TooltipButton>
              </DescriptionItem>

              <DescriptionItem
                label='Статус'
                footer={
                  descriptionControl.values.status && (
                    <div>
                      <Select
                        filterable={false}
                        name='status'
                        options={PRODUCT_STATUS}
                        placeholder='Выберите статус'
                      />

                      <div className='mt-2 gap-2 flex-between button:grow'>
                        <Button
                          view='normal'
                          onClick={() => onCancelSaveMeta('status')}
                        >
                          Отменить
                        </Button>

                        <Button
                          isLoading={mutation.isPending}
                          onClick={() => onSaveModelFields('status')}
                        >
                          Сохранить
                        </Button>
                      </div>
                    </div>
                  )
                }
                onClick={() => descriptionControl.toggleActive('status')}
              >
                <Label
                  theme={
                    { 0: 'warning', 1: 'normal' }[
                      productApi.model?.status || 0
                    ] as LabelTheme
                  }
                >
                  {Number(productApi?.model?.status) ? 'Активный' : 'Скрыт'}
                </Label>
              </DescriptionItem>

              <DescriptionItem
                label='Категории'
                footer={
                  descriptionControl.values.categories && (
                    <div>
                      <Select
                        multiple
                        name='categories'
                        options={formatCategories(categoriesApi.models)}
                        placeholder='Выберите категории'
                      />
                      <div className='mt-2 gap-2 flex-between button:grow'>
                        <Button
                          view='normal'
                          onClick={() => onCancelSaveMeta('categories')}
                        >
                          Отменить
                        </Button>

                        <Button
                          isLoading={mutation.isPending}
                          onClick={() => onSaveModelFields('categories')}
                        >
                          Сохранить
                        </Button>
                      </div>
                    </div>
                  )
                }
                onClick={() => descriptionControl.toggleActive('categories')}
              >
                {productApi?.model?.categories?.length ? (
                  <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                    {productApi?.model?.categories.map(({ id, name }) => (
                      <Label key={id} size='xs'>
                        {name}
                      </Label>
                    ))}
                  </div>
                ) : (
                  '—'
                )}
              </DescriptionItem>

              <DescriptionItem
                label='Описание'
                footer={
                  descriptionControl.values.description && (
                    <div>
                      <Textarea
                        name='description'
                        placeholder='Введите описание'
                      />

                      <div className='mt-2 gap-2 flex-between button:grow'>
                        <Button
                          view='normal'
                          onClick={() => onCancelSaveMeta('description')}
                        >
                          Отменить
                        </Button>

                        <Button
                          isLoading={mutation.isPending}
                          onClick={() => onSaveModelFields('description')}
                        >
                          Сохранить
                        </Button>
                      </div>
                    </div>
                  )
                }
                onClick={() => descriptionControl.toggleActive('description')}
              >
                {productApi.model?.description}
              </DescriptionItem>

              <DescriptionItem
                label='Характеристики'
                footer={
                  descriptionControl.values.features && (
                    <div>
                      <Textarea
                        name='features'
                        placeholder='Введите xарактеристики'
                      />
                      <div className='mt-2 gap-2 flex-between button:grow'>
                        <Button
                          view='normal'
                          onClick={() => onCancelSaveMeta('features')}
                        >
                          Отменить
                        </Button>

                        <Button
                          isLoading={mutation.isPending}
                          onClick={() => onSaveModelFields('features')}
                        >
                          Сохранить
                        </Button>
                      </div>
                    </div>
                  )
                }
                onClick={() => descriptionControl.toggleActive('features')}
              >
                {productApi.model?.features}
              </DescriptionItem>

              <DescriptionItem label='Дата создания'>
                {dater.toString(productApi.model?.created_at, Formats.second)}
              </DescriptionItem>

              <DescriptionItem label='Последнее обновление'>
                {dater.toString(productApi.model?.updated_at, Formats.second)}
              </DescriptionItem>
            </Description>
          </div>

          <div>
            <Text variant='header-2'>Изображения</Text>
          </div>
        </div>
      </PageLayout>
    </FormProvider>
  );
};
