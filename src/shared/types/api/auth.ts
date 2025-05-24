import { UserProps } from '@/shared/types/api/user.ts';

export interface AuthLoginProps {
  email: string;
  password: string;
}

export interface AuthRegisterProps {
  code: string;
  email: string;
}

export interface AuthLoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  user: UserProps;
}
