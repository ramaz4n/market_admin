import { authApi } from '@/shared/api/auth.ts';
import { logout } from '@/shared/models/auth.ts';

export const useLogout = () => () => authApi.logout().then(() => logout());
