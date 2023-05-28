import { ResponseData } from '@/modules/common/model';

export interface LineUp {
  id: string;
  clubId: string;
  clubName: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  players: LineUpPlayer[];
}

export interface LineUpRecord extends Omit<LineUp, 'id' | 'players' | 'clubId' | 'clubName'> {
  players: string[];
  clubId: string[];
}

export interface LineUpPlayer {
  id: string;
  nickname: string;
}

export type ResponseLineUpData = ResponseData<LineUp[]>;

export type ResponseSingleLineUpData = ResponseData<LineUp>;
