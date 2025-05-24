import { CategoryProps } from '@/shared/types/api/categories.ts';
import { PaginationRequest } from '@/shared/types/globals.ts';

export interface ProductCreateProps
  extends Omit<Partial<ProductProps>, 'categories' | 'image'> {
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
  id: number;
  image: string;
  name: string;
  price: string;
  status: number;
  updated_at: number;
}

export type ProductRequestProps = PaginationRequest<{
  id: number;
}>;
