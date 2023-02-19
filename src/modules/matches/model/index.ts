import { ResponseData } from '@/modules/common/model';
import { User } from '@/modules/users/model';

export interface Match {
  id?: string;
  club: string;
  startTime: Date;
  duration: number;
  level?: string;
  costPerPlayer?: number;
  players: User[];
}

export interface DateTime {
  start: Date | null;
  end: Date | null;
}

export type ResponseMatchData = ResponseData<Match[]>;

export type ResponseSingleMatchData = ResponseData<Match>;
