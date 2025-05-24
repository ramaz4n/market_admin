import { api } from '@/shared/api/axios.ts';
import {
  UserProfileResponseProps,
  UserProps,
  UserRequestProps,
} from '@/shared/types/api/user.ts';
import {
  FetchPaginationResponse,
  FetchResponse,
} from '@/shared/types/globals.ts';
import { concatUrlSlug } from '@/shared/utils/concat-url-slug.ts';

export const userApi = {
  list: (params?: UserRequestProps): FetchPaginationResponse<UserProps[]> =>
    api({ params, url: '/user' }),

  profile: (): Promise<UserProfileResponseProps> =>
    api({ url: '/api/user/profile' }),

  updateProfile: (
    data: UserProps,
    slug?: string,
  ): FetchResponse<{ subject: UserProps }> =>
    api({
      data,
      method: 'PATCH',
      url: concatUrlSlug('/api/auth/update', slug),
    }),

  view: (slug?: string): FetchResponse<UserProps> =>
    api({ url: concatUrlSlug('/user', slug) }),
};
