import { createRoot } from 'react-dom/client';

import { configure } from '@gravity-ui/uikit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { BrowserRouter } from 'react-router-dom';

import '../public/styles/app.css';

import 'dayjs/locale/ru'; // Подключение русской локализации
import { App } from '@/app.tsx';
import { ErrorBoundaryLayout } from '@/containers/error-boundary/error-boundary.tsx';

dayjs.locale('ru');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

configure({ lang: 'ru' });

createRoot(document.querySelector('#root')!).render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundaryLayout>
      <BrowserRouter>
        <App />
      </BrowserRouter>

      {import.meta.env.DEV && <ReactQueryDevtools />}
    </ErrorBoundaryLayout>
  </QueryClientProvider>,
);
