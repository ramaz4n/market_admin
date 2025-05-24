import { Fragment, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useUnit } from 'effector-react/effector-react.umd';
import { FormProvider, useForm } from 'react-hook-form';

import { Form } from '@/containers/form/form.tsx';
import { queryClient } from '@/main.tsx';
import { serviceCategoriesApi } from '@/shared/api/service-categories.ts';
import {
  $currentServiceCategory,
  resetCurrentServiceCategory,
} from '@/shared/models/service-categories.ts';
import { CategoryUpdateProps } from '@/shared/types/api/categories.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { Modal, ModalFooter } from '@/shared/ui/modal/modal.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { vld } from '@/shared/utils/form-validator.ts';

export const UpdateServiceCategoryModal = () => {
  const currentCategory = useUnit($currentServiceCategory);

  const methods = useForm<CategoryUpdateProps>({
    defaultValues: { name: '' },
  });

  const mutation = useMutation({
    mutationFn: (variables: CategoryUpdateProps) =>
      serviceCategoriesApi.update(variables, currentCategory?.id?.toString()),
    onSuccess: async () => {
      // return apiErrorParse(
      //   { name: ['this name is has been used'] },
      //   { setError: methods.setError },
      // );

      await queryClient.refetchQueries({
        queryKey: [QueryKeys.SERVICE_CATEGORIES],
      });
      toaster('Категория изменена');
      onClose();
    },
  });

  const onSubmit = (data: CategoryUpdateProps) => mutation.mutate(data);

  const onClose = () => {
    methods.reset();
    resetCurrentServiceCategory();
  };

  useEffect(() => {
    if (currentCategory) {
      methods.setValue('name', currentCategory.name);
    }
  }, [currentCategory]);

  return (
    <Modal
      name='update-service-category'
      title='Изменение категории'
      onClose={onClose}
    >
      <FormProvider {...methods}>
        <Form
          shouldDirty
          className='space-y-2.5'
          onSubmit={methods.handleSubmit(onSubmit)}
        >
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
                  Сохранить
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </Form>
      </FormProvider>
    </Modal>
  );
};
