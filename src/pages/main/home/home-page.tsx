import { PageLayout } from '@/containers/page-layout/page-layout.tsx';

export const HomePage = () => (
  <PageLayout
    breadcrumbsProps={{
      enabledStartLink: true,
      items: [{ href: '', text: 'Добро пожаловать' }],
    }}
  >
    <h2 className='mb-2 text-4xl text-foreground'>CMS</h2>
  </PageLayout>
);
