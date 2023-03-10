import Airtable, { FieldSet, Record } from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import { Match, MatchRecord } from '@/modules/matches/model';
import { ResultRecord, ResultType } from '@/modules/results/model';
import { User } from '@/modules/users/model';
import { Session } from '@/modules/sessions/model';
import { Result } from '@/modules/results/model';

export class AirtableData {
  private base: AirtableBase;

  constructor() {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
    });
    this.base = Airtable.base(process.env.AIRTABLE_BASE as string);
  }

  private mapRecordToMatch(record: Record<FieldSet>): Match {
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
  }

  private mapMatchToRecord(match: Match): MatchRecord {
    const { id, clubName, results, ...data } = match;
    return {
      ...data,
      startTime: match.startTime?.toString(),
      clubId: [match.clubId],
      players: match.players.map((player: User) => player.id) as string[],
    };
  }

  private mapRecordToResult(record: Record<FieldSet>): Result {
    return {
      id: record.id,
      type: record.get('type') as ResultType,
      home: Number(record.get('home')),
      away: Number(record.get('away')),
      matchId: record.get('matchId')?.toString() as string,
    };
  }

  private mapResultToRecord(result: Result): ResultRecord {
    const { id, ...data } = result;
    return {
      ...data,
      matchId: [result.matchId],
    };
  }

  private userMapper(record: Record<FieldSet>, userId?: string): User {
    return {
      id: userId || record.id,
      firstname: record.get('firstname') as string,
      lastname: record.get('lastname') as string,
      email: record.get('email') as string,
      nickname: record.get('nickname') as string,
    };
  }

  private sessionMapper(record: Record<FieldSet>): Session {
    return {
      id: record.id,
      user: this.userMapper(record, record.get('userId')?.toString()),
    };
  }

  private userSessionMapper(record: Record<FieldSet>): User {
    return {
      ...this.userMapper(record),
      id: record.get('userId')?.toString() as string,
    };
  }

  getMatches({ filterByFormula, sort }: { filterByFormula?: string; sort?: any[] } = {}) {
    return new Promise<Match[]>((resolve, reject) => {
      const matches: Match[] = [];
      const filters = filterByFormula ? { filterByFormula } : undefined;
      const options = sort ? { sort } : undefined;
      this.base('Match')
        .select({
          view: 'Grid view',
          pageSize: 10,
          ...filters,
          ...options,
        })
        .firstPage()
        .then(records => records.map(record => matches.push(this.mapRecordToMatch(record))))
        .then(() => resolve(matches))
        .catch(reject);
    });
  }

  getMatch(id: string) {
    return new Promise<Match>((resolve, reject) => {
      this.base('Match')
        .find(id)
        .then(record => resolve(this.mapRecordToMatch(record)))
        .catch(reject);
    });
  }

  createMatch(data: Match) {
    return new Promise<Match>((resolve, reject) => {
      const match = this.mapMatchToRecord(data);
      this.base('Match')
        .create([{ fields: { ...match } }])
        .then(records => resolve(this.mapRecordToMatch(records[0])))
        .catch(reject);
    });
  }

  updateMatch(data: Match) {
    return new Promise<Match>((resolve, reject) => {
      const matchRecord = this.mapMatchToRecord(data);
      this.base('Match')
        .update([
          {
            id: data.id as string,
            fields: { ...matchRecord },
          },
        ])
        .then(records => resolve(this.mapRecordToMatch(records[0])))
        .catch(reject);
    });
  }

  createResults(data: Result[]) {
    return new Promise<Result[]>((resolve, reject) => {
      this.base('Result')
        .create(data.map(result => ({ fields: { ...this.mapResultToRecord(result) } })))
        .then(records => resolve(records.map(this.mapRecordToResult)))
        .catch(reject);
    });
  }

  updateResults(data: Result[]) {
    return new Promise<Result[]>((resolve, reject) => {
      this.base('Result')
        .update(data.map(result => ({ id: result.id, fields: { ...this.mapResultToRecord(result) } })))
        .then(records => resolve(records.map(this.mapRecordToResult)))
        .catch(reject);
    });
  }

  deleteResults(data: Result[]) {
    return new Promise<Result[]>((resolve, reject) => {
      this.base('Result')
        .destroy(data.map(result => result.id))
        .then(records => resolve(records.map(this.mapRecordToResult)))
        .catch(reject);
    });
  }

  getUsers() {
    return new Promise<User[]>((resolve, reject) => {
      const users: User[] = [];
      this.base('User')
        .select({
          view: 'Grid view',
        })
        .eachPage((records, fetchNextPage) => {
          records.forEach(record => users.push(this.userMapper(record)));
          fetchNextPage();
        })
        .then(() => resolve(users))
        .catch(reject);
    });
  }

  getUserByNickname(nickname: string) {
    return new Promise<User>((resolve, reject) => {
      this.base('User')
        .select({
          view: 'Grid view',
          filterByFormula: encodeURI(`nickname='${nickname}'`),
          maxRecords: 1,
        })
        .firstPage()
        .then(records => {
          if (records.length) {
            return resolve(this.userMapper(records[0]));
          }
          reject(new Error('user_not_found'));
        })
        .catch(reject);
    });
  }

  getUserBySessionId(id: string) {
    return new Promise<User>((resolve, reject) => {
      this.base('Session')
        .find(id)
        .then(record => resolve(this.userSessionMapper(record)))
        .catch(reject);
    });
  }

  createUser(data: User) {
    return new Promise<User>((resolve, reject) => {
      const user = {
        ...data,
      };
      this.base('User')
        .create(user)
        .then(record => resolve(this.userMapper(record)))
        .catch(reject);
    });
  }

  getSession(id: string) {
    return new Promise<Session>((resolve, reject) => {
      this.base('Session')
        .find(id)
        .then(record => resolve(this.sessionMapper(record)))
        .catch(reject);
    });
  }

  deleteSession(id: string) {
    return new Promise<void>((resolve, reject) => {
      this.base('Session')
        .destroy([id])
        .then(() => resolve())
        .catch(reject);
    });
  }

  createSession(userId: string) {
    return new Promise<Session>((resolve, reject) => {
      this.base('Session')
        .create({
          userId: [userId],
        })
        .then(record => resolve(this.sessionMapper(record)))
        .catch(reject);
    });
  }
}
