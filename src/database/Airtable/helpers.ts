import { FieldSet, Record } from 'airtable';
import { Match, MatchRecord } from '@/modules/matches/model';
import { ResultRecord, ResultType } from '@/modules/results/model';
import { User } from '@/modules/users/model';
import { Session } from '@/modules/sessions/model';
import { Result } from '@/modules/results/model';
import { Club } from '@/modules/clubs/model';
import { LineUp } from '@/modules/lineups/model';

export const mapRecordToMatch = (record: Record<FieldSet>): Match => {
  const playerIds = (record.get('players') as string[]) || [];
  const playersNicknames = (record.get('playersNicknames') as string[]) || [];
  const playersFirstnames = (record.get('playersFirstnames') as string[]) || [];
  const resultIds = (record.get('results') as string[]) || [];
  const homeResults = (record.get('home') as string[]) || [];
  const awayResults = (record.get('away') as string[]) || [];
  const resultTypes = (record.get('resultType') as ResultType[]) || [];
  const results: Result[] = resultIds.map((id: string, i: number) => {
    return {
      id,
      type: resultTypes[i],
      home: Number(homeResults[i]),
      away: Number(awayResults[i]),
      matchId: record.id,
    };
  });

  return {
    id: record.id,
    clubId: record.get('clubId')?.toString() as string,
    clubName: record.get('clubName')?.toString() as string,
    startTime: record.get('startTime') as string,
    duration: record.get('duration') as number,
    players: playerIds.map((playerId: string, i: number) => {
      return {
        id: playerId,
        firstname: playersFirstnames[i],
        nickname: playersNicknames[i],
      } as User;
    }),
    courtBooked: record.get('courtBooked') as boolean,
    maxPlayers: record.get('maxPlayers') as number,
    results,
  };
};

export const mapMatchToRecord = (match: Match): MatchRecord => {
  const { id, clubName, results, maxPlayers, players = [], ...data } = match;
  return {
    ...data,
    maxPlayers: maxPlayers || 4,
    startTime: match.startTime?.toString(),
    clubId: [match.clubId],
    players: players.map((player: User) => player.id) as string[],
  };
};

export const mapRecordToResult = (record: Record<FieldSet>): Result => {
  return {
    id: record.id,
    type: record.get('type') as ResultType,
    home: Number(record.get('home')),
    away: Number(record.get('away')),
    matchId: record.get('matchId')?.toString() as string,
  };
};

export const mapResultToRecord = (result: Result): ResultRecord => {
  const { id, ...data } = result;
  return {
    ...data,
    matchId: [result.matchId],
  };
};

export const userMapper = (record: Record<FieldSet>, userId?: string): User => {
  return {
    id: userId || record.id,
    firstname: record.get('firstname') as string,
    lastname: record.get('lastname') as string,
    email: record.get('email') as string,
    nickname: record.get('nickname') as string,
    admin: record.get('admin') as boolean,
  };
};

export const sessionMapper = (record: Record<FieldSet>): Session => {
  return {
    id: record.id,
    user: userMapper(record, record.get('userId')?.toString()),
  };
};

export const userSessionMapper = (record: Record<FieldSet>): User => {
  return {
    ...userMapper(record),
    id: record.get('userId')?.toString() as string,
  };
};

export const mapRecordToClub = (record: Record<FieldSet>): Club => {
  return {
    id: record.id,
    name: record.get('name') as string,
  };
};

export const mapRecordToLineUp = (record: Record<FieldSet>): LineUp => {
  const playerIds = (record.get('players') as string[]) || [];
  const playersNicknames = (record.get('playersNicknames') as string[]) || [];
  return {
    id: record.id,
    clubId: record.get('clubId')?.toString() as string,
    clubName: record.get('clubName')?.toString() as string,
    date: record.get('date') as string,
    homeTeam: record.get('homeTeam') as string,
    awayTeam: record.get('awayTeam') as string,
    players: playerIds.map((playerId: string, i: number) => {
      return {
        id: playerId,
        nickname: playersNicknames[i],
      } as User;
    }),
  };
};
