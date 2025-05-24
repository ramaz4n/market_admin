import { useLocalStorage } from 'usehooks-ts';

import { LS_KEYS } from '@/shared/constants/ls-keys.ts';

export const useTheme = () => useLocalStorage(LS_KEYS.theme, 'light');
