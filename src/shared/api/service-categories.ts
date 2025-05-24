import {
  CategoryCreateProps,
  CategoryProps,
  CategoryRequestProps,
  CategoryUpdateProps,
} from '../types/api/categories';

import { api } from '@/shared/api/axios.ts';
import { FetchResponse } from '@/shared/types/globals.ts';
import { concatUrlSlug } from '@/shared/utils/concat-url-slug.ts';

export const serviceCategoriesApi = {
  create: (
    data: CategoryCreateProps,
  ): FetchResponse<{ category: CategoryProps }> =>
    api({ data, method: 'POST', url: '/api/category/service' }),

  delete: (slug?: string): FetchResponse<{ category: CategoryProps }> =>
    api({
      method: 'DELETE',
      url: concatUrlSlug('/api/category/service', slug),
    }),

  list: (
    params?: CategoryRequestProps,
  ): FetchResponse<{ data: CategoryProps[] }> =>
    api({ params, url: '/api/category/service' }),

  update: (
    data: CategoryUpdateProps,
    slug?: string,
  ): FetchResponse<{ category: CategoryProps }> =>
    api({
      data,
      method: 'PUT',
      url: concatUrlSlug('/api/category/service', slug),
    }),
};
