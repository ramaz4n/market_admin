import { lazy } from 'react';

export const ProductsViewPageLazy = lazy(() =>
  import('./products-view-page.tsx').then((res) => ({
    default: res.ProductsViewPage,
  })),
);
