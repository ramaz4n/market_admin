import { lazy } from 'react';

export const ProductListPageLazy = lazy(() =>
  import('./product-list-page.tsx').then((res) => ({
    default: res.ProductListPage,
  })),
);
