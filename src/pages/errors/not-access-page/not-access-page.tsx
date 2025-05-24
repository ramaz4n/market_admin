import { Text } from '@gravity-ui/uikit';

import { PageLayout } from '@/containers/page-layout/page-layout.tsx';

export const NotAccessPage = () => (
  <PageLayout
    breadcrumbsProps={{ items: [{ href: '', text: 'Страница не найдена' }] }}
  >
    <div>
      <Text variant='header-1'>Страница, не доступна для вас</Text>

      <p className='fs-sm mt-2.5'>Обратитесь к администраторам сайта</p>
    </div>
  </PageLayout>
);
