import { Fragment, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useUnit } from 'effector-react';
import { FormProvider, useForm } from 'react-hook-form';

import { Form } from '@/containers/form/form.tsx';
import { queryClient } from '@/main.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { useProduct } from '@/shared/hooks/api/use-product.ts';
import {
  formatCategories,
  useProductCategories,
} from '@/shared/hooks/api/use-product-categories.ts';
import { $modal, hideModalEvent } from '@/shared/models/modal.ts';
import { ProductCreateProps } from '@/shared/types/api/products.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { TableNames } from '@/shared/types/table.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { Modal, ModalFooter } from '@/shared/ui/modal/modal.tsx';
import { Select } from '@/shared/ui/select/select.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { Textarea } from '@/shared/ui/textarea/textarea.tsx';
import { vld } from '@/shared/utils/form-validator.ts';

export const UpdateProductModal = () => {
  const methods = useForm<ProductCreateProps>({
    defaultValues: {
      categories: [],
      description: '',
      name: '',
      price: '',
    },
  });

  const categoriesApi = useProductCategories();
  const { model: productModel } = useProduct();

  const modalStore = useUnit($modal);

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
      toaster('Товар изменен');
      onClose();
    },
  });

  const onSubmit = (data: ProductCreateProps) => {
    if (data.categories.length) {
      data.categories = data.categories.map(Number) as unknown as string[];
    }
    mutation.mutate(data);
  };

  const onClose = () => {
    methods.reset();
    hideModalEvent('update-product');
  };

  useEffect(() => {
    if (productModel && modalStore?.has('update-product')) {
      const { name, description, price, features, categories } = productModel;

      methods.setValue('name', name);
      methods.setValue('description', description);
      methods.setValue('price', price);
      methods.setValue('features', features);
      methods.setValue(
        'categories',
        categories.map(({ id }) => id?.toString()),
      );
    }
  }, [modalStore]);

  return (
    <FormProvider {...methods}>
      <Modal
        name='update-product'
        title='Редактирование товара'
        onClose={onClose}
      >
        <Form className='space-y-3.5' onSubmit={methods.handleSubmit(onSubmit)}>
          {({ isValid }) => (
            <Fragment>
              <Input
                name='name'
                placeholder='Название'
                rules={vld().required('Название').minLength(3)}
              />

              <Input
                name='price'
                placeholder='Цена'
                rules={vld().required('Цена').minLength(3)}
                type='number'
              />

              <Select
                multiple
                loading={categoriesApi.isLoading}
                name='categories'
                options={formatCategories(categoriesApi.models)}
                placeholder='Категории'
                rules={vld().required('Категории')}
              />

              <Textarea
                name='description'
                placeholder='Описание'
                rules={vld().required('Описание').minLength(3).maxLength(255)}
              />

              <Textarea
                name='features'
                placeholder='Характериситки'
                rules={vld()
                  .required('Характериситки')
                  .minLength(3)
                  .maxLength(255)}
              />

              <ModalFooter>
                <Button view='flat' onClick={onClose}>
                  Отменить
                </Button>

                <Button
                  disabled={!isValid}
                  isLoading={mutation.isPending}
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  Сохранить
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </Form>
      </Modal>
    </FormProvider>
  );
};
