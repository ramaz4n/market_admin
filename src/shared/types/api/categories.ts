import { PaginationRequest } from '@/shared/types/globals.ts';

export interface CategoryCreateProps {
  name: string;
}

export type CategoryUpdateProps = CategoryCreateProps;
export interface CategoryProps {
  created_at: number;
  id: number;
  name: string;
  updated_at: number;
}

export type CategoryRequestProps = PaginationRequest<{
  id?: number;
}>;
