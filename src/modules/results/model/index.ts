import { ResponseData } from '@/modules/common/model';

export type ResultType = 'set' | 'tiebreak';

export interface Result {
  id: string;
  type: ResultType;
  home: number;
  away: number;
  matchId: string;
}

export interface ResultRecord extends Omit<Result, 'id' | 'matchId'> {
  matchId: string[];
}

export type ResponseResultsData = ResponseData<Result[]>;

export type Side = 'home' | 'away';
