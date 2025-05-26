import { PencilToLine, Plus, TrashBin } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { CreateNewsModal } from '@/components/modals/create-news-modal/create-news-modal.tsx';
import { UpdateNewsModal } from '@/components/modals/update-news-modal/update-news-modal.tsx';
import { PageLayout } from '@/containers/page-layout/page-layout.tsx';
import { newsApi } from '@/shared/api/news.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { useNews } from '@/shared/hooks/api/use-news.ts';
import { useDeleteCallback } from '@/shared/hooks/use-delete-callback.ts';
import { useTableValues } from '@/shared/hooks/use-table-values.ts';
import { showModalEvent } from '@/shared/models/modal.ts';
import { setCurrentNews } from '@/shared/models/news.ts';
import { NewsProps } from '@/shared/types/api/news.ts';
import { TableNames } from '@/shared/types/table.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { MenuActions } from '@/shared/ui/menu-actions/menu-actions.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { Table, TableDataColumns } from '@/shared/ui/table/table.tsx';

export const NewsListPage = () => {
  const methods = useForm();
  const tableSore = useTableValues(TableNames.NEWS);

  const { models, isFetching, isLoading, refetch, pagination } =
    useNews(tableSore);

  const deleteCallback = useDeleteCallback();

  const removeMutation = useMutation({
    mutationFn: newsApi.delete,
    onSuccess: async () => {
      await refetch();
      toaster('Новость успешно удалена');
    },
  });

  const columns: TableDataColumns<NewsProps> = [
    {
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
      title: 'Название',
    },
    {
      key: 'description',
      render: ({ description }) => (
        <pre
          className='table-description-view max-w-96'
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
              action: () => setCurrentNews(data),
              iconStart: <Icon data={PencilToLine} />,
              text: 'Редактировать новость',
            },
            {
              action: () =>
                deleteCallback({
                  message: 'Отменить действие будет невозможно',
                  onRemove: () => removeMutation.mutate(String(data.id)),
                }),
              iconStart: <Icon data={TrashBin} />,
              text: 'Удалить новость',
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
        items: [{ href: '', text: 'Все новости' }],
      }}
      headerEndContent={
        <Button onClick={() => showModalEvent('create-news')}>
          <Icon data={Plus} />
          Добавить
        </Button>
      }
    >
      <UpdateNewsModal />
      <CreateNewsModal />

      <FormProvider {...methods}>
        <Table<NewsProps>
          columns={columns}
          data={models}
          emptyDataLabel='Новости'
          heading='Новости'
          isFetching={isFetching}
          isLoading={isLoading}
          name={TableNames.NEWS}
          pagination={pagination}
          onRowClick={(item, navFunc) => navFunc(LINKS.news(item.id))}
        />
      </FormProvider>
    </PageLayout>
  );
};
