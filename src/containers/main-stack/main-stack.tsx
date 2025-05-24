import { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Fallback } from '@/components/fallback/fallback.tsx';
import { CreateProductModal } from '@/components/modals/create-product-modal/create-product-modal.tsx';
import { MainLayout } from '@/containers/main-layout/main-layout.tsx';
import { MAIN_ROUTES } from '@/shared/constants/routes.tsx';
import { useProfile } from '@/shared/hooks/api/use-profile.ts';

/** use hook useProfile for checkActualAccessToken **/

export const MainStack = () => {
  const { isLoading } = useProfile();

  if (isLoading) {
    return <Fallback text='Настраиваем систему' />;
  }

  return (
    <MainLayout>
      <CreateProductModal />

      <Suspense fallback={<Fallback />}>
        <Routes>
          {MAIN_ROUTES.map(({ element, path }) => (
            <Route key={path} element={element} path={path} />
          ))}
        </Routes>
      </Suspense>
    </MainLayout>
  );
};
