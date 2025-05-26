import { PropsWithChildren } from 'react';

import { RadioButton } from '@gravity-ui/uikit';

import { THEME_VARIANTS } from '@/shared/constants/theme-variants.ts';
import { useTheme } from '@/shared/hooks/use-theme.ts';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useTheme();

  return (
    <main className='relative h-dvh w-dvw grid-cols-[62vw_auto] lg:grid'>
      <div className='flex-center max-lg:mt-14 max-md:mt-16'>{children}</div>

      <div className='h-full w-full bg-background-generic flex-center max-lg:hidden'>
        <img alt='Logo' className='size-48' src='/images/logo/logo.svg' />
      </div>

      <span className='absolute left-8 top-8 inline-flex items-end gap-2 text-3xl font-medium leading-6 max-md:inset-x-0 max-md:justify-center'>
        <img
          alt='Logo'
          className='size-7'
          src='/images/logo/no-fill-logo-accent.svg'
        />

        <p>Market admin</p>
      </span>

      <div className='absolute inset-x-0 bottom-2 mt-4 flex-wrap gap-2 flex-center max-lg:bottom-4 lg:max-w-[62vw]'>
        <span className='fs-sm'>Тема интерфейса</span>

        <RadioButton
          defaultValue={theme}
          name='theme'
          options={THEME_VARIANTS}
          onChange={(e) => setTheme(e.target.value)}
        />
      </div>
    </main>
  );
};
