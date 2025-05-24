import { FormProvider, useForm } from 'react-hook-form';

import { PageLayout } from '@/containers/page-layout/page-layout.tsx';

export const NewsListPage = () => {
  const methods = useForm();

  return (
    <PageLayout
      breadcrumbsProps={{
        items: [{ href: '', text: 'Все новости' }],
      }}
    >
      <FormProvider {...methods}>
        <span className='text-default-text'>Страница в разработке</span>
      </FormProvider>
    </PageLayout>
  );
};
