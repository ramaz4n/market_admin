import { CategoryProps } from '@/shared/types/api/categories.ts';
import { PaginationRequest, ServerFile } from '@/shared/types/globals.ts';

export interface ProductCreateProps
  extends Omit<Partial<ProductProps>, 'categories' | 'images' | 'status'> {
  categories: string[];
  images: File[];
}

export type ProductUpdateProps = ProductCreateProps & {
  status?: string;
};

export interface ProductProps {
  article: string;
  categories: Pick<CategoryProps, 'name' | 'id'>[];
  created_at: number;
  description: string;
  features: string;
  firm: string;
  id: number;
  images: ServerFile[];
  name: string;
  price: string;
  status: number;
  updated_at: number;
}

export type ProductRequestProps = PaginationRequest<{
  id?: number;
}>;
