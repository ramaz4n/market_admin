import { Component, type PropsWithChildren } from 'react';

import { Text } from '@gravity-ui/uikit';

import { Button } from '@/shared/ui/button/button.tsx';

type TErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundaryLayout extends Component<
  PropsWithChildren,
  TErrorBoundaryState
> {
  state: TErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='h-dvh flex-center'>
          <div className='max-w-form flex w-full flex-col gap-2.5'>
            <Text variant='header-2'>
              Кажется, что-то пошло не так и сломался один из скриптов
            </Text>

            <Button size='l' onClick={() => window.location.reload()}>
              Обновить страницу
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
