import { ComponentProps, useState } from 'react';

import { PencilToLine, TrashBin } from '@gravity-ui/icons';
import { DefinitionList, Divider, Icon, Label, Text } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ImagePreviewModal } from '@/components/image-preview-modal/image-preview-modal.tsx';
import { UpdateProductModal } from '@/components/modals/update-product-modal/update-product-modal.tsx';
import { PageLayout } from '@/containers/page-layout/page-layout.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { Formats } from '@/shared/constants/date-formats.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { useProduct } from '@/shared/hooks/api/use-product.ts';
import { useDeleteCallback } from '@/shared/hooks/use-delete-callback.ts';
import { showModalEvent } from '@/shared/models/modal.ts';
import { MenuActions } from '@/shared/ui/menu-actions/menu-actions.tsx';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';
import { UploadServerFile } from '@/shared/ui/uploader/upload-server-item.tsx';
import { dater } from '@/shared/utils/dater.ts';
type LabelTheme = ComponentProps<typeof Label>['theme'];

export const ProductsViewPage = () => {
  const productListApi = useProduct();
  const navFunc = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const deleteCallback = useDeleteCallback();

  const removeMutation = useMutation({
    mutationFn: productsApi.delete,
    onSuccess: async () => {
      navFunc(LINKS.news());
      toaster('Товар успешно удален');
    },
  });

  return (
    <PageLayout
      className='space-y-4'
      isLoading={productListApi.isLoading}
      breadcrumbsProps={{
        isLoading: productListApi.isLoading,
        items: [
          { href: LINKS.products(), text: 'Все товары' },
          { href: '', text: productListApi.model?.name ?? '' },
        ],
      }}
      headerEndContent={
        <MenuActions
          items={[
            {
              action: () => showModalEvent('update-product'),
              iconStart: <Icon data={PencilToLine} />,
              text: 'Редактировать',
            },
            {
              action: () =>
                deleteCallback({
                  message: 'Отменить действие будет невозможно',
                  onRemove: () =>
                    removeMutation.mutate(String(productListApi.model?.id)),
                }),
              iconStart: <Icon data={TrashBin} />,
              text: 'Удалить',
              theme: 'danger',
            },
          ]}
        />
      }
    >
      <UpdateProductModal />

      <div className='space-y-4'>
        <DefinitionList>
          <DefinitionList.Item
            {...(productListApi.model?.id && {
              copyText: productListApi.model.id.toString(),
            })}
            name='Id'
          >
            {productListApi.model?.id}
          </DefinitionList.Item>

          <DefinitionList.Item name='Название'>
            {productListApi.model?.name}
          </DefinitionList.Item>

          <DefinitionList.Item name='Цена'>
            {productListApi.model?.price}
          </DefinitionList.Item>

          <DefinitionList.Item
            name='Артикул'
            {...(productListApi.model?.article && {
              copyText: productListApi.model.article,
            })}
          >
            {productListApi.model?.article}
          </DefinitionList.Item>

          <DefinitionList.Item name='Фирма'>
            {productListApi.model?.firm || '—'}
          </DefinitionList.Item>

          <DefinitionList.Item name='Статус'>
            <Label
              theme={
                { 0: 'warning', 1: 'normal' }[
                  productListApi.model?.status || 0
                ] as LabelTheme
              }
            >
              {Number(productListApi?.model?.status) ? 'Активный' : 'Скрыт'}
            </Label>
          </DefinitionList.Item>

          <DefinitionList.Item name='Категории'>
            {productListApi?.model?.categories?.length ? (
              <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                {productListApi?.model?.categories.map(({ id, name }) => (
                  <Label key={id} size='xs'>
                    {name}
                  </Label>
                ))}
              </div>
            ) : (
              '—'
            )}
          </DefinitionList.Item>

          <DefinitionList.Item name='Описание'>
            <span
              dangerouslySetInnerHTML={{
                __html: productListApi.model?.description ?? '',
              }}
            />
          </DefinitionList.Item>

          <DefinitionList.Item name='Характеристики'>
            <span
              dangerouslySetInnerHTML={{
                __html: productListApi.model?.features ?? '',
              }}
            />
          </DefinitionList.Item>

          <DefinitionList.Item name='Дата создания'>
            {dater.toString(productListApi.model?.created_at, Formats.second)}
          </DefinitionList.Item>
        </DefinitionList>
      </div>

      <Divider className='my-4' />

      <div className='space-y-4'>
        <Text variant='subheader-3'>Изображения</Text>

        <div className='flex flex-wrap items-center gap-2.5'>
          {productListApi.model?.images?.map((image, index) => (
            <UploadServerFile
              shouldRemoveIcon={false}
              onClick={() => {
                showModalEvent('image-preview');
                setCurrentImageIndex(index);
              }}
              {...image}
              key={image.id}
            />
          ))}
        </div>
      </div>

      <ImagePreviewModal
        currentIndex={currentImageIndex}
        data={productListApi.model?.images || []}
        onClose={() => setCurrentImageIndex(0)}
        onNext={() => setCurrentImageIndex(currentImageIndex + 1)}
        onPrev={() => setCurrentImageIndex(currentImageIndex - 1)}
      />
    </PageLayout>
  );
};
