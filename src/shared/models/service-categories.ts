import { createEffect, createEvent, createStore, sample } from 'effector';

import { hideModalEvent, showModalEvent } from '@/shared/models/modal.ts';
import { CategoryProps } from '@/shared/types/api/categories.ts';

export const setCurrentServiceCategory = createEvent<CategoryProps>();
export const resetCurrentServiceCategory = createEvent();

export const $currentServiceCategory = createStore<CategoryProps | null>(null)
  .reset(resetCurrentServiceCategory)
  .on(setCurrentServiceCategory, (_, category) => category);

const setFx = createEffect(() => {
  showModalEvent('update-service-category');
});

const resetFx = createEffect(() => {
  hideModalEvent('update-service-category');
});

sample({
  source: resetCurrentServiceCategory,
  target: resetFx,
});

sample({
  source: setCurrentServiceCategory,
  target: setFx,
});
