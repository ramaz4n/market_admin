import { TrashBin } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { PageLayout } from '@/containers/page-layout/page-layout.tsx';
import { userApi } from '@/shared/api/user.ts';
import { Formats } from '@/shared/constants/date-formats.ts';
import { ROLE_OPTIONS } from '@/shared/constants/role-options.ts';
import { useUsers } from '@/shared/hooks/api/use-users.ts';
import { useDeleteCallback } from '@/shared/hooks/use-delete-callback.ts';
import { useTableValues } from '@/shared/hooks/use-table-values.ts';
import { UserProps, UserRequestProps } from '@/shared/types/api/user.ts';
import { TableNames } from '@/shared/types/table.ts';
import { MenuActions } from '@/shared/ui/menu-actions/menu-actions.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { Table, TableDataColumns } from '@/shared/ui/table/table.tsx';
import { dater } from '@/shared/utils/dater.ts';

export const UserListPage = () => {
  const methods = useForm();
  const tableSore = useTableValues<UserRequestProps>(TableNames.USERS);

  const { models, pagination, refetch, isLoading, isFetching } =
    useUsers(tableSore);

  const deleteCallback = useDeleteCallback();

  const removeMutation = useMutation({
    mutationFn: userApi.delete,
    onSuccess: async () => {
      await refetch();
      toaster('Пользователь успешно удален');
    },
  });

  const columns: TableDataColumns<UserProps> = [
    {
      key: 'id',
      thProps: { className: 'w-1' },
      title: 'ID',
    },
    {
      filter: {
        props: {
          placeholder: 'Фильтруем по username?',
        },
        type: 'input',
      },
      key: 'username',
      title: 'Username',
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
      filter: {
        props: {
          filterable: false,
          options: ROLE_OPTIONS,
          placeholder: 'Фильтруем по роли?',
        },
        type: 'select',
      },
      key: 'role',
      title: 'Роль',
    },
    {
      key: 'created_at',
      render: ({ created_at }) => dater.toString(created_at, Formats.second),
      title: 'Дата создания',
    },
    {
      key: 'updated_at',
      render: ({ updated_at }) => dater.toString(updated_at, Formats.second),
      title: 'Дата последнего обновления',
    },
    {
      key: 'actions',
      render: ({ id }) => (
        <MenuActions
          items={[
            {
              action: () =>
                deleteCallback({
                  message: 'Отменить действие будет невозможно',
                  onRemove: () => removeMutation.mutate(String(id)),
                }),
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
          // onRowClick={(item, navFunc) => navFunc(LINKS.users(item.id))}
          {...{ isFetching, isLoading, pagination }}
        />
      </FormProvider>
    </PageLayout>
  );
};
