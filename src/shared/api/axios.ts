import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

import { queryClient } from '@/main.tsx';
import { LS_KEYS } from '@/shared/constants/ls-keys.ts';
import { $appReadyApi } from '@/shared/models/app.ts';
import { logout } from '@/shared/models/auth.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';

export enum HttpErrors {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Ok = 200,
  Validation = 422,
  InternalServerError = 500,
}

export type ApiOptions = AxiosRequestConfig;

const baseURL = 'http://193.227.240.38' || import.meta.env.VITE_API_URL;

export const apiHelper = {
  checkValidToken: async () => {
    const res = await api({ url: '/api/user/profile' });

    if (res) {
      queryClient.setQueryData([QueryKeys.PROFILE], res);
    }

    return res;
  },
  refresh: async () => {
    const accessToken = localStorage.getItem(LS_KEYS.accessToken);

    const res = await axios.post('/api/auth/refresh', undefined, {
      baseURL,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.data;
  },
};

export const api = async (options: ApiOptions) => {
  try {
    const accessToken = localStorage.getItem(LS_KEYS.accessToken);

    const res = await axios.request({
      baseURL,
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...options.headers,
      },
      ...options,
    });

    return res.data;
  } catch (_error) {
    const { status, config: originalRequest, response } = _error as AxiosError;

    if (status === HttpErrors.Unauthorized && originalRequest) {
      try {
        const access_token = await apiHelper.refresh();

        if (access_token) {
          window.localStorage.setItem(LS_KEYS.accessToken, access_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;

          return axios(originalRequest);
        } else {
          logout();
        }
      } catch (__error) {
        const { status } = __error as AxiosError;

        if (status === HttpErrors.Unauthorized) {
          logout();
        }
      } finally {
        $appReadyApi.ready();
      }
    } else if (status === HttpErrors.Validation && originalRequest) {
      return response?.data;
    }
  }
};
