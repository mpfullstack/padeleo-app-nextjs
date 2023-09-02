import { Report } from '@/modules/reports/model';
import { Match } from '@/modules/matches/model';
import { User } from '@/modules/users/model';
import { Side } from '@/modules/results/model';

export interface Exporter {
  export: (data: Report[]) => any;
}

export type SourceData = {
  users: User[];
  matchesByUser: Match[][];
};

export interface Reporter {
  exporter: Exporter;
  generate: (data: SourceData) => Report[];
  export: <T>(data: Report[]) => T;
  getCompletedMatches: (matches: Match[]) => number;
  isMatchCompleted: (match: Match) => boolean;
  getWonMatches: (matches: Match[], user: User) => number;
  getLostMatches: (matches: Match[], user: User) => number;
  isMatchWon: (match: Match, player: User) => boolean;
  getWonGames: (matches: Match[], player: User) => number;
  getLostGames: (matches: Match[], player: User) => number;
  getPlayerSide: (players: User[], player: User) => Side;
}

export class JSONExport implements Exporter {
  export(data: Report[]): Report[] {
    return data;
  }
}
