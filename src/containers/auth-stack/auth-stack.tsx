import { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Fallback } from '@/components/fallback/fallback.tsx';
import { AuthLayout } from '@/containers/auth-layout/auth-layout.tsx';
import { AUTH_ROUTES } from '@/shared/constants/routes.tsx';

export const AuthStack = () => (
  <AuthLayout>
    <Suspense fallback={<Fallback />}>
      <Routes>
        {AUTH_ROUTES.map(({ element, path }) => (
          <Route key={path} element={element} path={path} />
        ))}
      </Routes>
    </Suspense>
  </AuthLayout>
);
