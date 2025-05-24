import { api } from '@/shared/api/axios.ts';
import { AuthLoginProps, AuthLoginResponse } from '@/shared/types/api/auth.ts';

export const authApi = {
  login: (data: AuthLoginProps): Promise<AuthLoginResponse> =>
    api({ data, method: 'POST', url: '/api/auth/login' }),

  logout: (): Promise<boolean> =>
    api({ method: 'POST', url: '/api/auth/logout' }),

  refresh: (): Promise<AuthLoginResponse> =>
    api({ method: 'POST', url: '/api/auth/refresh' }),
};
