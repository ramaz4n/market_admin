import { createEvent, createStore } from 'effector';

export type AsideName =
  | 'settings'
  | 'product-categories'
  | 'service-categories';

export type AsideStore = Set<AsideName> | null;

export const setAsideEvent = createEvent<AsideName>();
export const showAsideEvent = createEvent<AsideName>();
export const hideAsideEvent = createEvent<AsideName>();
export const hideAllAsideEvent = createEvent();

export const $asidePanels = createStore<AsideStore>(null)
  .on(showAsideEvent, (state, name) => {
    if (!state) {
      return new Set([name]);
    }

    state.add(name);

    return state;
  })
  .on(hideAsideEvent, (state, name) => {
    if (!state) {
      return null;
    }

    if (state.has(name)) {
      state.delete(name);
    }

    return state.size === 0 ? null : state;
  })
  .on(setAsideEvent, (_, n) => new Set([n]))
  .reset(hideAllAsideEvent);
