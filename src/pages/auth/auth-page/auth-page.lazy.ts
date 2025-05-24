import { lazy } from 'react';

export const AuthPageLazy = lazy(() =>
  import('./auth-page.tsx').then((res) => ({
    default: res.AuthPage,
  })),
);
