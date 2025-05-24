import { PaginationRequest } from '@/shared/types/globals.ts';

export type UserRequestProps = PaginationRequest<{
  email?: string;
  id?: string;
  status?: string;
  username?: string;
}>;

export interface UserProfileResponseProps {
  user: UserProps;
}

export interface UserProps {
  created_at: number;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  password: string;
  phone: string;
  role: string;
  updated_at: string;
}
