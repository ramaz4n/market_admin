import { api } from '@/shared/api/axios.ts';
import {
  ProductProps,
  ProductRequestProps,
  ProductUpdateProps,
} from '@/shared/types/api/products.ts';
import { FetchResponse } from '@/shared/types/globals.ts';
import { concatUrlSlug } from '@/shared/utils/concat-url-slug.ts';

export const productsApi = {
  create: (data: FormData): FetchResponse<{ category: ProductProps }> =>
    api({ data, method: 'POST', url: '/api/product' }),

  delete: (slug?: string): FetchResponse<{ product: ProductProps }> =>
    api({ method: 'DELETE', url: concatUrlSlug('/api/product', slug) }),

  deleteImage: (
    slug?: string,
    image_ids?: string[],
  ): FetchResponse<{ data: ProductProps }> =>
    api({ params: { image_ids }, url: `/api/product/${slug}/image` }),

  list: (
    params?: ProductRequestProps,
  ): FetchResponse<{ data: ProductProps[] }> =>
    api({ params, url: '/api/product' }),

  update: (
    data: Partial<ProductUpdateProps>,
    slug?: string,
  ): FetchResponse<{ product: ProductProps }> =>
    api({ data, method: 'PATCH', url: concatUrlSlug('/api/product', slug) }),

  view: (slug?: string): FetchResponse<{ data: ProductProps }> =>
    api({ url: concatUrlSlug('/api/product', slug) }),
};
