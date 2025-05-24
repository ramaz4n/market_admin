import { ComponentProps } from 'react';

import { AsideHeader } from '@gravity-ui/navigation';
import { Link } from 'react-router-dom';

import { LINKS } from '@/shared/constants/links.ts';

export const baseAsideProps: Partial<ComponentProps<typeof AsideHeader>> = {
  logo: {
    iconSize: 32,
    iconSrc: '/images/logo/logo.svg',
    text: 'Market',
    wrapper: (node) => <Link to={LINKS.home}>{node}</Link>,
  },
};
