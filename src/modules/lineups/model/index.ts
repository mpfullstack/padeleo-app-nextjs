import { ResponseData } from '@/modules/common/model';

export interface LineUp {
  id: string;
  clubId: string;
  clubName: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  players: LineUpPlayer[];
  convokedPlayers: LineUpPlayer[];
}

export interface LineUpRecord extends Omit<LineUp, 'id' | 'players' | 'clubId' | 'clubName' | 'convokedPlayers'> {
  players: string[];
  clubId: string[];
  convokedPlayers: string[];
}

export interface LineUpPlayer {
  id: string;
  nickname: string;
}

export interface LineUpCouple {
  id: string;
  playerIdA: string;
  playerIdB: string;
  playerScoreA: number;
  playerScoreB: number;
  lineUpId: string;
}

export interface LineUpCoupleRecord extends Omit<LineUpCouple, 'id' | 'playerIdA' | 'playerIdB' | 'lineUpId'> {
  playerA: string[];
  playerB: string[];
  playerScoreA: number;
  playerScoreB: number;
  lineUp: string[];
}

export type ResponseLineUpData = ResponseData<LineUp[]>;

export type ResponseSingleLineUpData = ResponseData<LineUp>;

export type ResponseLineUpCouplesData = ResponseData<LineUpCouple[]>;
