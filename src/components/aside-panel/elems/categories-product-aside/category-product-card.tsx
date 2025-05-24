import { Pencil, TrashBin } from '@gravity-ui/icons';
import { DropdownMenu, Icon, Skeleton, Text } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { queryClient } from '@/main.tsx';
import { productCategoriesApi } from '@/shared/api/product-categories.ts';
import { Formats } from '@/shared/constants/date-formats.ts';
import { useDeleteCallback } from '@/shared/hooks/use-delete-callback.ts';
import { setCurrentProductCategory } from '@/shared/models/product-categories.ts';
import { CategoryProps } from '@/shared/types/api/categories.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { toaster } from '@/shared/ui/sonner/sonner.tsx';

interface CategoryCardProps extends CategoryProps {
  isFetching?: boolean;
}

export const CategoryProductCard = ({
  isFetching,
  ...el
}: CategoryCardProps) => {
  const { id, name, created_at } = el;

  const deleteCallback = useDeleteCallback();

  const removeMutation = useMutation({
    mutationFn: productCategoriesApi.delete,
    onSuccess: async ({ message }) => {
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.PRODUCT_CATEGORIES],
      });
      toaster(message);
    },
  });

  if (isFetching) {
    return (
      <section className='gap-4 px-4 py-2.5 flex-between'>
        <div className='inline-flex items-center gap-2'>
          <Skeleton className='size-8' />

          <div className='flex flex-col gap-1'>
            <Skeleton className='h-4 w-44' />

            <Skeleton className='h-3 w-32' />
          </div>
        </div>

        <Skeleton className='size-7' />
      </section>
    );
  }

  return (
    <section className='px-4 py-2 hover:bg-background-generic'>
      <div className='gap-4 flex-between'>
        <div className='flex w-full items-center gap-2'>
          <div className='size-8 rounded-md bg-accent font-medium text-white flex-center'>
            {id}
          </div>

          <div className='flex w-full flex-col'>
            <Text className='line-clamp-1 break-all' variant='subheader-1'>
              {name}
            </Text>
            <p className='text-secondary-text'>
              {dayjs(created_at).format(Formats.second)}
            </p>
          </div>
        </div>

        <DropdownMenu
          popupProps={{ placement: 'bottom-end' }}
          items={[
            {
              action: () => setCurrentProductCategory(el),
              iconStart: <Icon data={Pencil} />,
              text: 'Редактировать',
            },
            {
              action: () =>
                deleteCallback({
                  message: 'Удалить категорию?',
                  onRemove: () => removeMutation.mutate(id.toString()),
                }),
              iconStart: <Icon data={TrashBin} />,
              text: 'Удалить',
              theme: 'danger',
            },
          ]}
        />
      </div>
    </section>
  );
};
