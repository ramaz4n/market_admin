import { createEvent, createStore } from 'effector';

export type ModalName =
  | 'create-product-category'
  | 'create-service-category'
  | 'update-product-category'
  | 'update-service-category'
  | 'create-product'
  | 'update-product'
  | 'create-order'
  | 'create-service'
  | 'update-service'
  | 'create-news'
  | 'update-news'
  | 'image-preview';

export type ModalStore = Set<ModalName> | null;

export const showModalEvent = createEvent<ModalName>();
export const hideModalEvent = createEvent<ModalName>();
export const hideAllModalEvent = createEvent();

export const $modal = createStore<ModalStore>(null)
  .on(showModalEvent, (state, name) => {
    if (!state) {
      return new Set([name]);
    }

    state.add(name);

    return new Set(state);
  })
  .on(hideModalEvent, (state, name) => {
    if (!state) {
      return null;
    }

    if (state.has(name)) {
      state.delete(name);
    }

    return state.size === 0 ? null : new Set(state);
  })
  .reset(hideAllModalEvent);
