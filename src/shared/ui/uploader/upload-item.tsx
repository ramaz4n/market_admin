import { memo } from 'react';

import { FileArrowDown, TrashBin } from '@gravity-ui/icons';
import { Button, Icon } from '@gravity-ui/uikit';

import { Filer } from '@/shared/utils/file-service.ts';

interface UploadItemProps extends Filer {
  onFileRemove: () => void;
}

export const UploadItem = memo(
  ({ name, isImage, sizeString, url, onFileRemove }: UploadItemProps) => {
    const renderFileContent = () => {
      if (isImage) {
        return (
          <img
            alt={name}
            className='size-full rounded object-cover text-xs'
            src={url}
          />
        );
      }

      return <Icon className='clamp-7' data={FileArrowDown} />;
    };

    return (
      <div className='group/item relative inline-block rounded-md p-1.5 hover:bg-background-generic'>
        <div className='invisible absolute right-1.5 top-1.5 z-20 inline-flex flex-col gap-1 opacity-0 transition-all duration-300 group-hover/item:visible group-hover/item:opacity-100'>
          <Button type='button' view='action' onClick={onFileRemove}>
            <Icon data={TrashBin} />
          </Button>
        </div>

        <div
          className='relative h-20 w-28 rounded-md border border-dashed border-border p-1.5'
          title={name}
        >
          <div className='size-full flex-center'>{renderFileContent()}</div>
        </div>

        <div className='mt-1 flex flex-col items-center'>
          <span className='block max-w-28 text-balance break-all text-center text-xs'>
            {name}
          </span>
          <p className='text-xs text-secondary-text'>{sizeString}</p>
        </div>
      </div>
    );
  },
);
