import { api } from '@/shared/api/axios.ts';
import {
  CategoryCreateProps,
  CategoryProps,
  CategoryRequestProps,
  CategoryUpdateProps,
} from '@/shared/types/api/categories.ts';
import {
  FetchPaginationResponse,
  FetchResponse,
} from '@/shared/types/globals.ts';
import { concatUrlSlug } from '@/shared/utils/concat-url-slug.ts';

export const productCategoriesApi = {
  create: (
    data: CategoryCreateProps,
  ): FetchResponse<{ category: CategoryProps }> =>
    api({ data, method: 'POST', url: '/api/categories' }),

  delete: (slug?: string): FetchResponse<{ category: CategoryProps }> =>
    api({ method: 'DELETE', url: concatUrlSlug('/api/categories', slug) }),

  list: (
    params?: CategoryRequestProps,
  ): FetchPaginationResponse<CategoryProps[]> =>
    api({ params, url: '/api/categories' }),

  update: (
    data: CategoryUpdateProps,
    slug?: string,
  ): FetchResponse<{ category: CategoryProps }> =>
    api({ data, method: 'PUT', url: concatUrlSlug('/api/categories', slug) }),
};
