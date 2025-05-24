/* eslint-disable @typescript-eslint/ban-ts-comment */
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { userApi } from '@/shared/api/user.ts';
import { UserRequestProps } from '@/shared/types/api/user.ts';
import { TableNames } from '@/shared/types/table.ts';

export const useUsers = <T extends UserRequestProps>(params?: T) => {
  const q = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => userApi.list(params),
    queryKey: [TableNames.USERS, params],
  });

  return {
    ...q,
    // @ts-ignore
    models: q.data?.data?.models || [],
    pagination: {
      // @ts-ignore
      lastPage: q.data?.data?.lastPage || 1,
    },
  };
};
