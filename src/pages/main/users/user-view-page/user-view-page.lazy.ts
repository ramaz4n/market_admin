import { lazy } from 'react';

export const UserViewPageLazy = lazy(() =>
  import('./user-view-page.tsx').then((res) => ({
    default: res.UserViewPage,
  })),
);
