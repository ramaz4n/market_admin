import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { userApi } from '@/shared/api/user.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';

export const useProfile = () => {
  const query = useQuery({
    placeholderData: keepPreviousData,
    queryFn: userApi.profile,
    queryKey: [QueryKeys.PROFILE],
  });

  return { model: query?.data?.user, ...query };
};

export const useUserModel = () => {
  const { id } = useParams();

  const query = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => userApi.view(id),
    queryKey: [QueryKeys.USER_VIEW, id],
  });

  return { userModel: query?.data, ...query };
};
