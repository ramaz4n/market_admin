import { lazy } from 'react';

export const UserListPageLazy = lazy(() =>
  import('./user-list-page.tsx').then((res) => ({
    default: res.UserListPage,
  })),
);
