import { lazy } from 'react';

export const ProfilePageLazy = lazy(() =>
  import('./profile-page.tsx').then((res) => ({
    default: res.ProfilePage,
  })),
);
