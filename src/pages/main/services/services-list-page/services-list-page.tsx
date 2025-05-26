import { PencilToLine, Plus, TrashBin } from '@gravity-ui/icons';
import { Icon, Label } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { CreateServiceModal } from '@/components/modals/create-service-modal/create-service-modal.tsx';
import { UpdateServiceModal } from '@/components/modals/update-service-modal/update-service-modal.tsx';
import { PageLayout } from '@/containers/page-layout/page-layout.tsx';
import { serviceApi } from '@/shared/api/service.ts';
import { useService } from '@/shared/hooks/api/use-service.ts';
import {
  formatCategories,
  useServiceCategories,
} from '@/shared/hooks/api/use-service-categories.ts';
import { useDeleteCallback } from '@/shared/hooks/use-delete-callback.ts';
import { useTableValues } from '@/shared/hooks/use-table-values.ts';
import { showModalEvent } from '@/shared/models/modal.ts';
import { setCurrentService } from '@/shared/models/service.ts';
import { ServiceProps } from '@/shared/types/api/service.ts';
import { TableNames } from '@/shared/types/table.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { MenuActions } from '@/shared/ui/menu-actions/menu-actions.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { Table, TableDataColumns } from '@/shared/ui/table/table.tsx';

export const ServicesListPage = () => {
  const methods = useForm();
  const tableSore = useTableValues(TableNames.SERVICE);

  const { models, isFetching, isLoading, refetch, pagination } =
    useService(tableSore);

  const deleteCallback = useDeleteCallback();

  const categoriesApi = useServiceCategories();

  const removeMutation = useMutation({
    mutationFn: serviceApi.delete,
    onSuccess: async () => {
      await refetch();
      toaster('Услуга успешно удалена');
    },
  });

  const columns: TableDataColumns<ServiceProps> = [
    {
      filter: {
        props: {
          placeholder: 'Фильтруем по id?',
        },
        type: 'input',
      },
      key: 'id',
      title: 'ID',
    },
    {
      filter: {
        props: {
          placeholder: 'Фильтруем по названию?',
        },
        type: 'input',
      },
      key: 'name',
      render: ({ name, image }) => (
        <div>
          {image && (
            <img
              alt={name}
              className='rounded-lg object-cover clamp-10'
              height={40}
              src={image}
              width={40}
            />
          )}

          <span>{name}</span>
        </div>
      ),
      sortKey: 'name',
      title: 'Название',
    },
    {
      filter: {
        key: 'categories',
        props: {
          options: formatCategories(categoriesApi.models),
          placeholder: 'Фильтруем по названию?',
        },
        type: 'select',
      },
      key: 'category',
      render: ({ category }) => <Label>{category?.name}</Label>,
      sortKey: 'category',
      title: 'Категория',
    },
    {
      filter: {
        props: {
          placeholder: 'Фильтруем по цене?',
        },
        type: 'input',
      },
      key: 'price',
      sortKey: 'price',
      title: 'Цена',
    },
    {
      key: 'description',
      render: ({ description }) => (
        <pre
          className='table-description-view line-clamp-4 max-w-96'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ),
      tdProps: {
        className: 'w-96',
      },
      title: 'Описание',
    },
    {
      key: 'actions',
      render: (data) => (
        <MenuActions
          items={[
            {
              action: () => setCurrentService(data),
              iconStart: <Icon data={PencilToLine} />,
              text: 'Редактировать услугу',
            },
            {
              action: () =>
                deleteCallback({
                  message: 'Отменить действие будет невозможно',
                  onRemove: () => removeMutation.mutate(String(data.id)),
                }),
              iconStart: <Icon data={TrashBin} />,
              text: 'Удалить услугу',
              theme: 'danger',
            },
          ]}
        />
      ),
      title: '',
    },
  ];

  return (
    <PageLayout
      breadcrumbsProps={{
        items: [{ href: '', text: 'Все услуги' }],
      }}
      headerEndContent={
        <Button onClick={() => showModalEvent('create-service')}>
          <Icon data={Plus} />
          Добавить
        </Button>
      }
    >
      <UpdateServiceModal />
      <CreateServiceModal />

      <FormProvider {...methods}>
        <Table<ServiceProps>
          columns={columns}
          data={models}
          emptyDataLabel='Услуги'
          heading='Услуги'
          isFetching={isFetching}
          isLoading={isLoading}
          name={TableNames.SERVICE}
          pagination={pagination}
        />
      </FormProvider>
    </PageLayout>
  );
};
