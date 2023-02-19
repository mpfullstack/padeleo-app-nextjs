import { ResponseData } from '@/modules/common/model';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  nickname?: string;
  phone?: string;
}

export type ResponseUserData = ResponseData<User[]>;
