import { Fragment } from 'react';

import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { Form } from '@/containers/form/form.tsx';
import { queryClient } from '@/main.tsx';
import { productsApi } from '@/shared/api/products.ts';
import {
  formatCategories,
  useProductCategories,
} from '@/shared/hooks/api/use-product-categories.ts';
import { hideAllModalEvent } from '@/shared/models/modal.ts';
import { ProductCreateProps } from '@/shared/types/api/products.ts';
import { TableNames } from '@/shared/types/table.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Editor } from '@/shared/ui/editor/editor.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { Modal, ModalFooter } from '@/shared/ui/modal/modal.tsx';
import { Select } from '@/shared/ui/select/select.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { Uploader } from '@/shared/ui/uploader/uploader.tsx';
import { apiErrorParse } from '@/shared/utils/api-error-parse.ts';
import { formDataParse } from '@/shared/utils/form-data-parse.ts';
import { vld } from '@/shared/utils/form-validator.ts';

export const CreateProductModal = () => {
  const methods = useForm<ProductCreateProps>({
    defaultValues: {
      categories: [],
      description: '',
      firm: '',
      name: '',
      price: '',
    },
  });

  const categoriesApi = useProductCategories();

  const mutation = useMutation({
    mutationFn: productsApi.create,
    onSuccess: async ({ errors }) => {
      if (errors) {
        return apiErrorParse(errors, { setError: methods.setError });
      }

      await queryClient.refetchQueries({ queryKey: [TableNames.PRODUCTS] });
      toaster('Товар создан');
      onClose();
    },
  });

  const onSubmit = ({ images: files, ...data }: ProductCreateProps) => {
    mutation.mutate(formDataParse(data, { files }));
  };

  const onClose = () => {
    methods.reset();
    hideAllModalEvent();
  };

  return (
    <FormProvider {...methods}>
      <Modal
        name='create-product'
        size='xl'
        title='Создание товара'
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

              <Input
                name='firm'
                placeholder='Фирма'
                rules={vld().required('Фирма')}
              />

              <Editor
                name='description'
                placeholder='Описание'
                rules={vld().required('Описание').minLength(3)}
              />

              <Editor
                name='features'
                placeholder='Характериситки'
                rules={vld().required('Характериситки').minLength(3)}
              />

              <Uploader
                multiple
                name='images'
                uploadButtonProps={{ children: 'Прикрепить изображения' }}
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
                  Создать
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </Form>
      </Modal>
    </FormProvider>
  );
};
