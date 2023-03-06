import { ResponseData } from '@/modules/common/model';
import { User } from '@/modules/users/model';

export interface Match {
  id: string;
  clubId: string;
  clubName: string;
  startTime: string;
  duration: number;
  level?: string;
  costPerPlayer?: number;
  players: User[];
  courtBooked: boolean;
  maxPlayers: number;
  results: Result[];
}

export interface MatchRecord extends Omit<Match, 'id' | 'players' | 'clubId' | 'clubName' | 'results'> {
  players: string[];
  clubId: string[];
}

export type Status = 'opened' | 'closed';

export interface Club {
  id?: string;
  name: string;
}

export interface DateTime {
  start: Date | null;
  end: Date | null;
}

export interface Result {
  id: string;
  type: ResultType;
  home: number;
  away: number;
}

export type ResultType = 'set' | 'tiebreak';

export type ResponseMatchData = ResponseData<Match[]>;

export type ResponseSingleMatchData = ResponseData<Match>;

export type Action = 'join' | 'leave';
