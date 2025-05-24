import { useLayoutEffect, useState } from 'react';

import { useUnit } from 'effector-react';

import { useTheme } from '@/shared/hooks/use-theme.ts';
import { $auth, initAuth } from '@/shared/models/auth.ts';

export const useApp = () => {
  const authToken = useUnit($auth);

  const [isAppReady, setIsAppReady] = useState(false);

  const [theme] = useTheme();

  useLayoutEffect(() => {
    initAuth();
    setIsAppReady(true);
  }, []);

  return { authToken, isAppReady, theme };
};
