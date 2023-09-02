import { ResponseData } from '@/modules/common/model';
// import { User } from '@/modules/users/model';
// import { Result } from '@/modules/results/model';

export interface Report {
  username: string;
  playedMatches: number;
  completedMatches: number;
  wonMatches: number;
  lostMatches: number;
  wonGames: number;
  lostGames: number;
}

export type ResponseReportData = ResponseData<Report[] | string>;
