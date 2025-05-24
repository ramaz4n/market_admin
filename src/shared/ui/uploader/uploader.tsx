/* eslint-disable unicorn/prefer-spread */

import { Paperclip, Plus } from '@gravity-ui/icons';
import { Button, Icon } from '@gravity-ui/uikit';
import { Controller } from 'react-hook-form';

import { FileArray, UploaderProps } from '@/shared/ui/uploader/types.ts';
import { UploadItem } from '@/shared/ui/uploader/upload-item.tsx';
import { useUploader } from '@/shared/ui/uploader/use-uploader.tsx';
import { checkExtension } from '@/shared/utils/check-extension.ts';
import { checkSize } from '@/shared/utils/check-size.ts';
import { cn } from '@/shared/utils/cn.ts';
import { Filer } from '@/shared/utils/file-service.ts';
import { Vld } from '@/shared/utils/form-validator.ts';

export const Uploader = (props: UploaderProps) => {
  const uploader = useUploader(props);

  const {
    rules,
    classNames,
    name,
    uploadButtonProps,
    extensionOptions,
    sizeOptions,
    isDisabled,
    control,
    multiple,
    inputRef,
    onChange,
    handleFocus,
  } = uploader;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules instanceof Vld ? rules.build() : rules}
      render={({
        field: { onChange: onControllerChange, value },
        fieldState,
      }) => {
        const handleUpload = (fileList: FileList | null) => {
          if (!fileList || isDisabled) return;

          const files = [...fileList];

          if (extensionOptions) {
            const { hasErrorByExtension, unCheckFiles } = checkExtension({
              extensionOptions,
              files,
            });

            if (hasErrorByExtension) {
              return extensionOptions?.onError?.(unCheckFiles);
            }
          }

          if (sizeOptions?.value) {
            const { hasErrorBySize, unCheckFiles } = checkSize({
              files,
              sizeOptions,
            });

            if (hasErrorBySize) {
              return sizeOptions?.onError?.(unCheckFiles);
            }
          }

          const returnedFiles = ((): FileArray => {
            if (Array.isArray(value as FileArray) && multiple) {
              return (value as FileArray).concat(files);
            }

            return files;
          })();

          onControllerChange(returnedFiles);
          onChange?.(name, returnedFiles);
        };

        const onFileRemove = (uid: number, filers: Filer[]) => {
          if (!Array.isArray(value)) return;

          const returnedFiles = [];

          for (const f of filers) {
            if (f.uid !== uid) {
              returnedFiles.push(f.toFile());
            }
          }

          if (inputRef.current) {
            inputRef.current.value = '';
          }
          onControllerChange(returnedFiles);
          onChange?.(name, returnedFiles);
        };

        const isVisibleRenderList = value && Array.isArray(value);

        const formattedFiles = ((): Filer[] => {
          if (!isVisibleRenderList) return [];
          const result: File[] | Filer[] = value;

          if (result.every((f) => f instanceof Filer)) {
            return result as Filer[];
          }

          const filers: Filer[] = [];

          for (const f of result) {
            f instanceof File ? filers.push(new Filer(f)) : filers.push(f);
          }

          return filers;
        })();

        const visibleUploadButton = (() => {
          if (!value) return true;

          if (Array.isArray(value) && value.length) {
            return false;
          } else if (Array.isArray(value) && !value.length) {
            return true;
          }
        })();

        return (
          <div className='space-y-1'>
            {visibleUploadButton && (
              <Button
                type='button'
                view='flat'
                onClick={handleFocus}
                {...uploadButtonProps}
              >
                <Icon data={Paperclip} />
                {uploadButtonProps?.children || 'Прикрепить файлы'}
              </Button>
            )}

            {value && (
              <div
                className={cn(
                  'group/list relative mt-2.5 flex flex-wrap gap-2',
                  classNames?.list,
                )}
              >
                {formattedFiles.map((f) => (
                  <UploadItem
                    onFileRemove={() => onFileRemove(f.uid, formattedFiles)}
                    {...f}
                    key={f.uid}
                  />
                ))}

                {multiple && !visibleUploadButton && (
                  <button
                    className='mt-1.5 h-20 rounded-md border border-dashed border-border bg-background-generic px-1.5 transition-all duration-300 flex-center group-hover/list:visible group-hover/list:opacity-100 lg:invisible lg:opacity-0'
                    type='button'
                    onClick={handleFocus}
                  >
                    <Icon data={Plus} />
                  </button>
                )}
              </div>
            )}

            {fieldState.error?.message && (
              <div className='text-sm text-danger'>
                {fieldState.error.message}
              </div>
            )}

            <input
              ref={inputRef}
              className='hidden'
              disabled={isDisabled}
              multiple={multiple}
              type='file'
              onChange={(e) => handleUpload(e.target.files)}
            />
          </div>
        );
      }}
    />
  );
};
