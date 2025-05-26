import { memo } from 'react';

import { File as FileIcon, TrashBin } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';

import { IMAGE_EXTENSIONS_SET } from '../../constants/extensions.ts';

import { ServerFile } from '@/shared/types/globals.ts';
import { dater } from '@/shared/utils/dater.ts';

interface UploadServerFileProps extends ServerFile {
  onClick: () => void;
  onDefaultFileRemove?: (id: number) => void;
  shouldRemoveIcon?: boolean;
}

export const UploadServerFile = memo(
  ({
    id,
    onClick,
    shouldRemoveIcon = true,
    path,
    name,
    created_at,
    onDefaultFileRemove,
  }: UploadServerFileProps) => {
    const renderFileContent = () => {
      if (IMAGE_EXTENSIONS_SET.has(name.split('.').pop() ?? '')) {
        return (
          <img
            alt={name}
            className='animated aspect-[1/1.1] w-full max-w-20 rounded-md object-cover text-xs group-hover/item:brightness-50'
            src={path}
          />
        );
      }

      return (
        <Icon
          className='mx-auto'
          data={FileIcon}
          height={70 * 1.2}
          width={70}
        />
      );
    };

    return (
      <div
        className='group/item relative flex w-fit cursor-pointer flex-col rounded-md border border-dotted border-border p-1.5'
        title={name}
        onClick={onClick}
      >
        <div className='invisible absolute inset-0 rounded-md bg-black/50 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100' />

        {renderFileContent()}

        <div className='line-clamp-2 max-w-20 break-all text-center'>
          {name}
        </div>
        <span className='text-center text-xs text-secondary-text'>
          {dater.toString(created_at)}
        </span>

        {shouldRemoveIcon && (
          <button
            className='invisible inline-block opacity-0 transition-all duration-300 pos-abs group-hover/item:visible group-hover/item:opacity-100'
            type='button'
            onClick={() => onDefaultFileRemove?.(id)}
          >
            <Icon className='text-white clamp-4' data={TrashBin} />
          </button>
        )}
      </div>
    );
  },
);
