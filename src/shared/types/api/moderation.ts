import { TermProps } from '@/shared/types/api/term.ts';
import { UserProps } from '@/shared/types/api/user.ts';
import { PaginationRequest } from '@/shared/types/globals.ts';

export type ModerationRequestProps = PaginationRequest<{
  id?: string;
  status?: string;
  termId?: string;
  type?: string;
  userId?: string;
}>;

export interface ModerationProps {
  createdAt: number;
  definition: string;
  id: number;
  issueUser: UserProps;
  issueUserId: number;
  name: string;
  oldDefinition: string;
  oldName: string;
  status: number;
  statusText: string;
  term: TermProps;
  termId: number;
  type: number;
  typeText: string;
  updatedAt: number;
  user: UserProps;
  userId: number;
}
