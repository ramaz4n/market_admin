import { forwardRef, HTMLAttributes } from 'react';

import { ArrowRotateLeft, TrashBin } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';
import { useLocalStorage } from 'usehooks-ts';

import { LS_KEYS } from '@/shared/constants/ls-keys.ts';
import { UseDraftsReturn } from '@/shared/hooks/use-drafts.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { cn } from '@/shared/utils/cn.ts';

export interface DraftAlertProps
  extends UseDraftsReturn,
    HTMLAttributes<HTMLDivElement> {
  triggeredClassName?: string;
}

const DraftAlert = forwardRef<HTMLDivElement, DraftAlertProps>(
  (
    {
      className,
      triggeredClassName = 'data-[triggered=true]:hidden',
      onClear,
      hasDrafts,
      onTrigger,
    },
    ref,
  ) => {
    const [enabledDraftSave] = useLocalStorage(LS_KEYS.saveDrafts, 'true');

    if (!hasDrafts || enabledDraftSave === 'false') return null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded bg-background-generic p-2.5',
          triggeredClassName,
          className,
        )}
      >
        <span className='whitespace-nowrap text-sm font-medium'>
          Есть несохраненый черновик
        </span>

        <div className='inline-flex items-center gap-2'>
          <Button onClick={onTrigger}>
            <Icon data={ArrowRotateLeft} />
            Восстановить
          </Button>

          <Button
            className='hover:bg-transparent hover:opacity-70'
            view='flat-danger'
            onClick={onClear}
          >
            <Icon data={TrashBin} />
            Удалить
          </Button>
        </div>
      </div>
    );
  },
);

export { DraftAlert };
