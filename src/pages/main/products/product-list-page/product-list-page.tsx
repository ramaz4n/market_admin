import { ComponentProps } from 'react';

import { Eye, Plus, TrashBin } from '@gravity-ui/icons';
import { ClipboardButton, Icon, Label } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { PageLayout } from '@/containers/page-layout/page-layout.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { Formats } from '@/shared/constants/date-formats.ts';
import { LINKS } from '@/shared/constants/links.ts';
import {
  formatCategories,
  useProductCategories,
} from '@/shared/hooks/api/use-product-categories.ts';
import { useProducts } from '@/shared/hooks/api/use-products.ts';
import { useDeleteCallback } from '@/shared/hooks/use-delete-callback.ts';
import { useTableValues } from '@/shared/hooks/use-table-values.ts';
import { showModalEvent } from '@/shared/models/modal.ts';
import {
  ProductProps,
  ProductRequestProps,
} from '@/shared/types/api/products.ts';
import { TableNames } from '@/shared/types/table.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { MenuActions } from '@/shared/ui/menu-actions/menu-actions.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { Table, TableDataColumns } from '@/shared/ui/table/table.tsx';
import { dater } from '@/shared/utils/dater.ts';

type LabelTheme = ComponentProps<typeof Label>['theme'];

export const ProductListPage = () => {
  const methods = useForm();

  const tableSore = useTableValues<ProductRequestProps>(TableNames.PRODUCTS);

  const { models, isFetching, isLoading, refetch } = useProducts(tableSore);

  const deleteCallback = useDeleteCallback();

  const categoriesApi = useProductCategories();

  const removeMutation = useMutation({
    mutationFn: productsApi.delete,
    onSuccess: async () => {
      await refetch();
      toaster('Товар успешно удален');
    },
  });

  const columns: TableDataColumns<ProductProps> = [
    {
      // filter: {
      //   props: {
      //     placeholder: 'Фильтруем по id?',
      //   },
      //   type: 'input',
      // },
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
      sortKey: 'name',
      tdProps: { className: 'max-w-80' },
      title: 'Название',
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
      key: 'article',
      render: ({ article = '' }) => (
        <ClipboardButton text={article}>{article}</ClipboardButton>
      ),
      tdProps: {
        onClick: (event) => event.stopPropagation(),
      },
      title: 'Артикул',
    },
    {
      key: 'firm',
      title: 'Фирма',
    },
    {
      filter: {
        props: {
          filterable: false,
          options: [
            {
              content: 'Активный',
              value: '1',
            },
            {
              content: 'Скрыт',
              value: '0',
            },
          ],
          placeholder: 'Фильтруем по статусу?',
        },
        type: 'select',
      },
      key: 'status',
      render: ({ status }) => (
        <Label theme={{ 0: 'warning', 1: 'normal' }[status] as LabelTheme}>
          {Number(status) ? 'Активный' : 'Скрыт'}
        </Label>
      ),
      sortKey: 'status',
      title: 'Статус',
    },
    {
      filter: {
        props: {
          filterable: false,
          options: formatCategories(categoriesApi.models),
          placeholder: 'Фильтруем по категориям?',
        },
        type: 'select',
      },
      key: 'category',
      render: ({ categories }) =>
        categories?.length ? (
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
            {categories.map(({ id, name }) => (
              <Label key={id} size='xs'>
                {name}
              </Label>
            ))}
          </div>
        ) : (
          '—'
        ),
      tdProps: { className: 'max-w-96' },
      title: 'Категории',
    },
    {
      key: 'description',
      render: ({ description }) => (
        <span
          className='line-clamp-6 max-w-60'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ),
      title: 'Описание',
    },
    {
      key: 'features',
      render: ({ features }) => (
        <span
          className='line-clamp-6 max-w-60'
          dangerouslySetInnerHTML={{ __html: features }}
        />
      ),
      title: 'Характеристики',
    },
    {
      key: 'createdAt',
      render: (data) => dater.toString(data?.created_at, Formats.second),
      title: 'Дата создания',
    },
    {
      key: 'actions',
      render: (data) => (
        <MenuActions
          items={[
            {
              action: () => {},
              iconStart: <Icon data={Eye} />,
              text: 'Просмотр',
            },
            {
              action: () =>
                deleteCallback({
                  message: 'Отменить действие будет невозможно',
                  onRemove: () => removeMutation.mutate(String(data.id)),
                }),
              iconStart: <Icon data={TrashBin} />,
              text: 'Удалить товар',
              theme: 'danger',
            },
          ]}
        />
      ),
      title: '',
    },
  ];

  return (
    <>
      <PageLayout
        breadcrumbsProps={{
          items: [{ href: '', text: 'Все товары' }],
        }}
        headerEndContent={
          <Button onClick={() => showModalEvent('create-product')}>
            <Icon data={Plus} />
            Добавить
          </Button>
        }
      >
        <FormProvider {...methods}>
          <Table<ProductProps>
            columns={columns}
            data={models}
            emptyDataLabel='Товары'
            heading='Товары'
            isFetching={isFetching}
            isLoading={isLoading}
            name={TableNames.PRODUCTS}
            onRowClick={(item, navFunc) => navFunc(LINKS.products(item.id))}
          />
        </FormProvider>
      </PageLayout>
    </>
  );
};
