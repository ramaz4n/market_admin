import { createEffect, createEvent, createStore, sample } from 'effector';

import { queryClient } from '../../main.tsx';

import { LS_KEYS, LS_KEYS_FOR_REMOVE } from '@/shared/constants/ls-keys.ts';
import { AuthLoginResponse } from '@/shared/types/api/auth.ts';

export const login = createEvent<AuthLoginResponse>();
export const initAuth = createEvent();
export const logout = createEvent();

export const $auth = createStore<string | null>(null)
  .on(login, (_, payload) => payload.access_token)
  .on(initAuth, () => localStorage.getItem(LS_KEYS.accessToken))
  .reset(logout);

const setAuthStorageFx = createEffect(({ access_token }: AuthLoginResponse) => {
  // localStorage.setItem(LS_KEYS.refreshToken, refresh_token);
  localStorage.setItem(LS_KEYS.accessToken, access_token);
});

const clearStorageFx = createEffect(() => {
  for (const key of LS_KEYS_FOR_REMOVE) localStorage.removeItem(key);
  queryClient.clear();
});

sample({
  source: logout,
  target: clearStorageFx,
});

sample({
  source: login,
  target: setAuthStorageFx,
});
