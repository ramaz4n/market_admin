import { TrashBin } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';
import { FormProvider, useForm } from 'react-hook-form';

import { PageLayout } from '@/containers/page-layout/page-layout.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { useUsers } from '@/shared/hooks/api/use-users.ts';
import { useTableValues } from '@/shared/hooks/use-table-values.ts';
import { UserProps, UserRequestProps } from '@/shared/types/api/user.ts';
import { TableNames } from '@/shared/types/table.ts';
import { MenuActions } from '@/shared/ui/menu-actions/menu-actions.tsx';
import { Table, TableDataColumns } from '@/shared/ui/table/table.tsx';

export const UserListPage = () => {
  const methods = useForm();
  const tableSore = useTableValues<UserRequestProps>(TableNames.USERS);

  const { models, pagination, isLoading, isFetching } = useUsers(tableSore);

  const columns: TableDataColumns<UserProps> = [
    {
      filter: {
        props: {
          placeholder: 'Фильтруем по id?',
        },
        type: 'input',
      },
      key: 'id',
      sortKey: 'id',
      thProps: { className: 'w-1' },
      title: 'ID',
    },
    {
      filter: {
        props: {
          placeholder: 'Фильтруем по почте?',
        },
        type: 'input',
      },
      key: 'email',
      sortKey: 'email',
      title: 'Почта',
    },
    {
      key: 'statusText',
      sortKey: 'status',
      title: 'Статус',
    },
    {
      key: 'createdAt',
      sortKey: 'createdAt',
      title: 'Дата создания',
    },
    {
      key: 'actions',
      render: () => (
        <MenuActions
          items={[
            {
              action: () => console.log('Delete'),
              iconStart: <Icon data={TrashBin} size={16} />,
              text: 'Удалить',
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
        items: [{ href: '', text: 'Все пользователи' }],
      }}
    >
      <FormProvider {...methods}>
        <Table<UserProps>
          columns={columns}
          data={models}
          emptyDataLabel='Пользователи'
          heading='Пользователи'
          name={TableNames.USERS}
          rowCellClassName='py-2.5'
          onRowClick={(item, navFunc) => navFunc(LINKS.users(item.id))}
          {...{ isFetching, isLoading, pagination }}
        />
      </FormProvider>
    </PageLayout>
  );
};
