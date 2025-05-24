import { createApi, createStore } from 'effector';

export const $appReady = createStore<boolean>(false);

export const $appReadyApi = createApi($appReady, {
  ready: () => true,
});
