import { Fragment } from 'react';

import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { Form } from '@/containers/form/form.tsx';
import { queryClient } from '@/main.tsx';
import { serviceCategoriesApi } from '@/shared/api/service-categories.ts';
import { hideAllModalEvent } from '@/shared/models/modal.ts';
import { CategoryCreateProps } from '@/shared/types/api/categories.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { Modal, ModalFooter } from '@/shared/ui/modal/modal.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { vld } from '@/shared/utils/form-validator.ts';

export const CreateServiceCategoryModal = () => {
  const methods = useForm<CategoryCreateProps>({
    defaultValues: { name: '' },
  });

  const mutation = useMutation({
    mutationFn: serviceCategoriesApi.create,
    onSuccess: async () => {
      // return apiErrorParse(
      //   { name: ['this name has been used'] },
      //   { setError: methods.setError },
      // );

      await queryClient.refetchQueries({
        queryKey: [QueryKeys.SERVICE_CATEGORIES],
      });
      toaster('Категория создана');
      onClose();
    },
  });

  const onSubmit = (data: CategoryCreateProps) => mutation.mutate(data);

  const onClose = () => {
    methods.reset();
    hideAllModalEvent();
  };

  return (
    <FormProvider {...methods}>
      <Modal
        name='create-service-category'
        title='Создание категории'
        onClose={onClose}
      >
        <Form className='space-y-2.5' onSubmit={methods.handleSubmit(onSubmit)}>
          {({ isValid }) => (
            <Fragment>
              <Input
                className='my-2'
                name='name'
                placeholder='Название'
                rules={vld().required('Название').minLength(3)}
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
