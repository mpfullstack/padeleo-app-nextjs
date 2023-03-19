import { ResponseData } from '@/modules/common/model';

export interface Club {
  id?: string;
  name: string;
}

export type ResponseClubData = ResponseData<Club[]>;

export type ResponseSingleClubData = ResponseData<Club>;
