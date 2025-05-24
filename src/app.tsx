import { ThemeProvider } from '@gravity-ui/uikit';

import { Fallback } from '@/components/fallback/fallback.tsx';
import { AuthStack } from '@/containers/auth-stack/auth-stack.tsx';
import { MainStack } from '@/containers/main-stack/main-stack.tsx';
import { useApp } from '@/shared/hooks/use-app.ts';
import { Toaster } from '@/shared/ui/sonner/sonner.tsx';

export type FlowProps = Partial<ReturnType<typeof useApp>>;

export const App = () => {
  const { authToken, isAppReady, theme } = useApp();

  return (
    <ThemeProvider theme={theme}>
      <FLow {...{ authToken, isAppReady }} />

      <Toaster />
    </ThemeProvider>
  );
};

const FLow = ({ isAppReady, authToken }: FlowProps) => {
  if (!isAppReady) {
    return <Fallback text='Настраиваем систему' />;
  }

  if (!authToken) return <AuthStack />;

  return <MainStack />;
};
