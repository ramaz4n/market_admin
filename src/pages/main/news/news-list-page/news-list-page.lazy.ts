import { lazy } from 'react';

export const NewsListPageLazy = lazy(() =>
  import('./news-list-page.tsx').then((res) => ({
    default: res.NewsListPage,
  })),
);
