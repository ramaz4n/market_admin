import { type SelectOption } from '@gravity-ui/uikit';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { productCategoriesApi } from '@/shared/api/product-categories.ts';
import {
  CategoryProps,
  CategoryRequestProps,
} from '@/shared/types/api/categories.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';

export const useProductCategories = <T extends CategoryRequestProps>(
  params?: T,
) => {
  const q = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => productCategoriesApi.list(params),
    queryKey: [QueryKeys.PRODUCT_CATEGORIES, params],
  });

  return {
    ...q,
    models: q.data?.data || [],
    pagination: q.data?.pagination,
  };
};

export function formatCategories(m: CategoryProps[]): SelectOption[] {
  if (!m || !m.length) return [];

  return m.map(({ id, name }) => ({
    content: name,
    value: id?.toString(),
  }));
}
