import {
  Box,
  Persons,
  Plus,
  Shapes4,
  ShoppingCart,
  SquareListUl,
} from '@gravity-ui/icons';
import { type MenuItem } from '@gravity-ui/navigation';
import { Icon } from '@gravity-ui/uikit';
import { Link, Navigate, type RouteProps } from 'react-router-dom';

import { AuthPageLazy } from '@/pages/auth/auth-page/auth-page.lazy.ts';
import { NotAccessPageLazy } from '@/pages/errors/not-access-page/not-access-page.lazy.ts';
import { NotFoundPageLazy } from '@/pages/errors/not-found-page/not-found-page.lazy.ts';
import { HomePageLazy } from '@/pages/main/home/home-page.lazy.ts';
import { NewsListPageLazy } from '@/pages/main/news/news-list-page/news-list-page.lazy.ts';
import { NewsViewPageLazy } from '@/pages/main/news/news-view-page/news-view-page.lazy.ts';
import { OrdersCreatePageLazy } from '@/pages/main/orders/orders-create-page/orders-create-page.lazy.ts';
import { OrdersListPageLazy } from '@/pages/main/orders/orders-list-page/orders-list-page.lazy.ts';
import { OrdersViewPageLazy } from '@/pages/main/orders/orders-view-page/orders-view-page.lazy.ts';
import { ProductListPageLazy } from '@/pages/main/products/product-list-page/product-list-page.lazy.ts';
import { ProductsViewPageLazy } from '@/pages/main/products/products-view-page/products-view-page.lazy.ts';
import { ProfilePageLazy } from '@/pages/main/profile/profile-page.lazy.ts';
import { ServicesListPageLazy } from '@/pages/main/services/services-list-page/services-list-page.lazy.ts';
import { UserListPageLazy } from '@/pages/main/users/user-list-page/user-list-page.lazy.ts';
import { LINKS } from '@/shared/constants/links.ts';

export const ASIDE_MENU_LIST: MenuItem[] = [
  {
    icon: Persons,
    id: LINKS.users(),
    itemWrapper: (node, makeItem) => (
      <Link className='size-full' to={LINKS.users()}>
        {makeItem(node)}
      </Link>
    ),
    title: 'Пользователи',
    tooltipText: 'Пользователи',
  },
  {
    icon: ShoppingCart,
    id: LINKS.products(),
    itemWrapper: (node, makeItem) => (
      <Link className='size-full' to={LINKS.products()}>
        {makeItem(node)}
      </Link>
    ),
    title: 'Товары',
    tooltipText: 'Товары',
  },
  {
    icon: Box,
    id: LINKS.orders(),
    itemWrapper: (node, makeItem) => (
      <Link className='size-full' to={LINKS.orders()}>
        {makeItem(node)}
      </Link>
    ),
    title: 'Заказы',
    tooltipText: 'Заказы',
  },
  {
    icon: Shapes4,
    id: LINKS.services(),
    itemWrapper: (node, makeItem) => (
      <Link className='size-full' to={LINKS.services()}>
        {makeItem(node)}
      </Link>
    ),
    title: 'Услуги',
    tooltipText: 'Услуги',
  },
  {
    icon: SquareListUl,
    id: LINKS.news(),
    itemWrapper: (node, makeItem) => (
      <Link className='size-full' to={LINKS.news()}>
        {makeItem(node)}
      </Link>
    ),
    title: 'Новости',
    tooltipText: 'Новости',
  },
  {
    afterMoreButton: true,
    id: LINKS.createOrder,
    itemWrapper: (_, __, { compact }) => (
      <Link
        className='g-button g-button_view_action g-button_size_l g-button_pin_circle-circle mx-2 w-full flex-center'
        to={LINKS.createOrder}
      >
        <Icon data={Plus} />
        {!compact && 'Создать заказ'}
      </Link>
    ),
    title: 'Заказ',
    tooltipText: 'Создать заказ',
  },
];

export const MAIN_ROUTES: RouteProps[] = [
  { element: <UserListPageLazy />, path: LINKS.users() },
  { element: <ProductListPageLazy />, path: LINKS.products() },
  { element: <ServicesListPageLazy />, path: LINKS.services() },
  { element: <NewsListPageLazy />, path: LINKS.news() },
  { element: <OrdersListPageLazy />, path: LINKS.orders() },
  { element: <OrdersCreatePageLazy />, path: LINKS.createOrder },
  {
    element: <HomePageLazy />,
    path: LINKS.home,
  },
  {
    element: <ProfilePageLazy />,
    path: LINKS.profile,
  },
  {
    element: <ProductsViewPageLazy />,
    path: LINKS.products(':id'),
  },
  {
    element: <NewsViewPageLazy />,
    path: LINKS.news(':id'),
  },
  {
    element: <OrdersViewPageLazy />,
    path: LINKS.orders(':id'),
  },
  {
    element: <NotFoundPageLazy />,
    path: LINKS.notFound,
  },
  {
    element: <NotAccessPageLazy />,
    path: LINKS.notAccess,
  },
  {
    element: <Navigate to={LINKS.notFound} />,
    path: '*',
  },
];

export const AUTH_ROUTES: RouteProps[] = [
  {
    element: <AuthPageLazy />,
    path: LINKS.home,
  },
  {
    element: <NotFoundPageLazy />,
    path: LINKS.notFound,
  },
  {
    element: <NotAccessPageLazy />,
    path: LINKS.notAccess,
  },
  {
    element: <Navigate to={LINKS.home} />,
    path: '*',
  },
];
