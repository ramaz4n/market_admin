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
  delete: (slug?: string): FetchResponse<{ message: string }> =>
    api({ method: 'DELETE', url: concatUrlSlug('/api/users', slug) }),

  list: (params?: UserRequestProps): FetchPaginationResponse<UserProps[]> =>
    api({ params, url: '/api/users' }),

  profile: (): Promise<UserProfileResponseProps> =>
    api({ url: '/api/user/profile' }),

  updateProfile: (
    data: { subject: Partial<UserProps> },
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
