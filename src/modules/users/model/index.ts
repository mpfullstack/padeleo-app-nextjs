import { ResponseData } from '@/modules/common/model';

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  nickname?: string;
  phone?: string;
  admin?: boolean;
  lineUpsJoinedCount?: number;
  lineUpsConvokedCount?: number;
}

export type ResponseUserData = ResponseData<User[]>;

export type ResponseSingleUserData = ResponseData<User>;
