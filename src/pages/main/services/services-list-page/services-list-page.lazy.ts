import { lazy } from 'react';

export const ServicesListPageLazy = lazy(() =>
  import('./services-list-page.tsx').then((res) => ({
    default: res.ServicesListPage,
  })),
);
