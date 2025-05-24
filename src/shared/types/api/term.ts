import { PaginationRequest } from '@/shared/types/globals.ts';

export interface TermCreateProps {
  definition: string;
  name: string;
  description?: string;
  keywords?: string;
  slug?: string;
}

export interface TermProps {
  createdAt: number;
  definition: string;
  deletedAt: number;
  id: number;
  name: string;
  updatedAt: number;
}

export type TermRequestProps = PaginationRequest<{
  id: number;
}>;
