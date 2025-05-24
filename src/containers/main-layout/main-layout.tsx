import { PropsWithChildren } from 'react';

import { AsideHeader } from '@gravity-ui/navigation';

import { AsidePanel } from '@/components/aside-panel/aside-panel.tsx';
import { CategoriesProductAside } from '@/components/aside-panel/elems/categories-product-aside/categories-product-aside.tsx';
import { CategoriesServiceAside } from '@/components/aside-panel/elems/categories-service-aside/categories-service-aside.tsx';
import { SettingsAside } from '@/components/aside-panel/elems/settings-aside.tsx';
import { ProfilePopup } from '@/components/profile-popup/profile-popup.tsx';
import { useAside } from '@/shared/hooks/use-aside.tsx';

export const MainLayout = (props: PropsWithChildren) => {
  const { asidePanels, ...asideProps } = useAside(props);

  return (
    <AsideHeader
      renderFooter={() => <ProfilePopup />}
      panelItems={[
        {
          children: (
            <AsidePanel>
              <SettingsAside />
            </AsidePanel>
          ),
          id: 'settings',
          keepMounted: true,
          visible: Boolean(asidePanels && asidePanels.has('settings')),
        },
        {
          children: (
            <AsidePanel className='p-0 lg:min-w-big-panel'>
              <CategoriesProductAside />
            </AsidePanel>
          ),
          id: 'categories-product',
          keepMounted: true,
          visible: Boolean(
            asidePanels && asidePanels.has('product-categories'),
          ),
        },
        {
          children: (
            <AsidePanel className='p-0 lg:min-w-big-panel'>
              <CategoriesServiceAside />
            </AsidePanel>
          ),
          id: 'categories-service',
          keepMounted: true,
          visible: Boolean(
            asidePanels && asidePanels.has('service-categories'),
          ),
        },
      ]}
      {...asideProps}
    />
  );
};
