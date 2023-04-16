import { ResponseData } from '@/modules/common/model';
import { User } from '@/modules/users/model';

export interface LineUp {
  id: string;
  clubId: string;
  clubName: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  players: User[];
}

export interface LineUpRecord extends Omit<LineUp, 'id' | 'players' | 'clubId' | 'clubName'> {
  players: string[];
  clubId: string[];
}

export type ResponseLineUpData = ResponseData<LineUp[]>;

export type ResponseSingleLineUpData = ResponseData<LineUp>;
