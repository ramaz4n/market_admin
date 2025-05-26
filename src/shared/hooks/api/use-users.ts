import { type SelectOption } from '@gravity-ui/uikit';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { userApi } from '@/shared/api/user.ts';
import { UserProps, UserRequestProps } from '@/shared/types/api/user.ts';
import { TableNames } from '@/shared/types/table.ts';

export const useUsers = <T extends UserRequestProps>(params?: T) => {
  const q = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => userApi.list(params),
    queryKey: [TableNames.USERS, params],
  });

  return {
    ...q,
    models: q.data?.data || [],
    pagination: q.data?.pagination,
  };
};

export const formatUsers = (list: UserProps[]): SelectOption[] => {
  if (!list || !list.length) {
    return [];
  }

  return list.map((item) => ({
    children: `${item.username} (${item.email})`,
    value: item.id.toString(),
  }));
};
