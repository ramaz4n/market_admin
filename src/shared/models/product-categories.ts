import { createEffect, createEvent, createStore, sample } from 'effector';

import { hideModalEvent, showModalEvent } from '@/shared/models/modal.ts';
import { CategoryProps } from '@/shared/types/api/categories.ts';

export const setCurrentProductCategory = createEvent<CategoryProps>();
export const resetCurrentProductCategory = createEvent();

export const $currentProductCategory = createStore<CategoryProps | null>(null)
  .reset(resetCurrentProductCategory)
  .on(setCurrentProductCategory, (_, category) => category);

const setFx = createEffect(() => {
  showModalEvent('update-product-category');
});

const resetFx = createEffect(() => {
  hideModalEvent('update-product-category');
});

sample({
  source: resetCurrentProductCategory,
  target: resetFx,
});

sample({
  source: setCurrentProductCategory,
  target: setFx,
});
