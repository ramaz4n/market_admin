import { Text } from '@gravity-ui/uikit';

import { PageLayout } from '@/containers/page-layout/page-layout.tsx';

export const NotFoundPage = () => (
  <PageLayout
    breadcrumbsProps={{ items: [{ href: '', text: 'Страница не найдена' }] }}
  >
    <div>
      <Text variant='header-1'>
        Страница, которую вы ищете, не может быть найдена
      </Text>
      <p className='fs-sm mt-2.5'>
        Возможно, вы перешли по ссылке, в которой была допущена ошибка, или
        ресурс был удален.
        <br /> Попробуйте перейти на главную страницу
      </p>
    </div>
  </PageLayout>
);
