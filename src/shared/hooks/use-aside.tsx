import { PropsWithChildren } from 'react';

import { Gear, Layers3Diagonal, Shapes3 } from '@gravity-ui/icons';
import { useUnit } from 'effector-react';
import { useLocation } from 'react-router-dom';
import { useClickAnyWhere, useLocalStorage } from 'usehooks-ts';

import { baseAsideProps } from '@/shared/constants/aside.tsx';
import { LS_KEYS } from '@/shared/constants/ls-keys.ts';
import { ASIDE_MENU_LIST } from '@/shared/constants/routes.tsx';
import {
  $asidePanels,
  AsideName,
  hideAllAsideEvent,
  setAsideEvent,
} from '@/shared/models/aside.ts';

export const useAside = ({ children }: PropsWithChildren) => {
  const [compact, onChangeCompact] = useLocalStorage(LS_KEYS.aside, false);

  const { pathname } = useLocation();

  const asidePanels = useUnit($asidePanels);

  const toggleAsidePanel = (name: AsideName) => {
    setAsideEvent(name);
  };

  const getAsideMenuItems = () => {
    const res = [];

    for (const item of ASIDE_MENU_LIST) {
      const current = Boolean(
        pathname === '/'
          ? false
          : item.id.slice(1).startsWith(pathname.split('/')[1]),
      );

      res.push({
        ...item,
        current,
      });
    }

    return res;
  };
  const renderContent = () => children;

  useClickAnyWhere((event) => {
    const overlay = document.querySelector('.gn-drawer__veil');

    if (!event.target || !overlay) return;

    if (overlay.isSameNode(event.target as Node)) {
      hideAllAsideEvent();
    }
  });

  return {
    compact,
    headerDecoration: true,
    menuItems: getAsideMenuItems(),
    onChangeCompact,
    renderContent,
    subheaderItems: [
      {
        icon: Gear,
        id: 'settings',
        onItemClick: () => toggleAsidePanel('settings'),
        title: 'Настройки',
      },
      {
        icon: Layers3Diagonal,
        id: 'settings-product',
        onItemClick: () => toggleAsidePanel('product-categories'),
        title: 'Категории товаров',
      },
      {
        icon: Shapes3,
        id: 'settings-service',
        onItemClick: () => toggleAsidePanel('service-categories'),
        title: 'Категории услуг',
      },
    ],
    ...baseAsideProps,
    asidePanels,
  };
};
