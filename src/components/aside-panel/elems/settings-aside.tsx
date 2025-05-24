import { RadioButton, Text } from '@gravity-ui/uikit';
import { useLocalStorage } from 'usehooks-ts';

import { LS_KEYS } from '@/shared/constants/ls-keys.ts';
import {
  DRAFTS_VARIANTS,
  THEME_VARIANTS,
} from '@/shared/constants/theme-variants.ts';
import { useTheme } from '@/shared/hooks/use-theme.ts';

export const SettingsAside = () => {
  const [theme, setTheme] = useTheme();

  const [isSaveDraft, updateSaveDraft] = useLocalStorage(
    LS_KEYS.saveDrafts,
    'true',
  );

  return (
    <div className='size-full flex-col flex-between'>
      <div className='w-full space-y-2'>
        <Text className='font-medium' variant='subheader-3'>
          Настройки
        </Text>

        <div className='w-full flex-between'>
          <Text className='font-medium'>Тема интерфейса</Text>

          <RadioButton
            options={THEME_VARIANTS}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        </div>

        <div className='w-full flex-between'>
          <Text className='font-medium'>Сохранять черновики</Text>

          <RadioButton
            options={DRAFTS_VARIANTS}
            value={isSaveDraft}
            onChange={(e) => updateSaveDraft(e.target.value)}
          />
        </div>
      </div>

      <p className='w-full text-start text-secondary-text'>
        Все настройки сохраняются только на ваш брузер
      </p>
    </div>
  );
};
