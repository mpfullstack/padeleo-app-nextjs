import Airtable from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import { Match } from '@/modules/matches/model';
import { User } from '@/modules/users/model';
import { Session } from '@/modules/sessions/model';
import { Result } from '@/modules/results/model';
import { Club } from '@/modules/clubs/model';
import {
  mapRecordToMatch,
  mapMatchToRecord,
  mapResultToRecord,
  mapRecordToResult,
  sessionMapper,
  mapRecordToClub,
  userMapper,
  userSessionMapper,
} from '@/database/Airtable/helpers';

export class AirtableData {
  private base: AirtableBase;

  constructor() {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
    });
    this.base = Airtable.base(process.env.AIRTABLE_BASE as string);
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
        .then(records => records.map(record => matches.push(mapRecordToMatch(record))))
        .then(() => resolve(matches))
        .catch(reject);
    });
  }

  getMatch(id: string) {
    return new Promise<Match>((resolve, reject) => {
      this.base('Match')
        .find(id)
        .then(record => resolve(mapRecordToMatch(record)))
        .catch(reject);
    });
  }

  createMatch(data: Match) {
    return new Promise<Match>((resolve, reject) => {
      const match = mapMatchToRecord(data);
      this.base('Match')
        .create([{ fields: { ...match } }])
        .then(records => resolve(mapRecordToMatch(records[0])))
        .catch(reject);
    });
  }

  updateMatch(data: Match) {
    return new Promise<Match>((resolve, reject) => {
      const matchRecord = mapMatchToRecord(data);
      this.base('Match')
        .update([
          {
            id: data.id as string,
            fields: { ...matchRecord },
          },
        ])
        .then(records => resolve(mapRecordToMatch(records[0])))
        .catch(reject);
    });
  }

  deleteMatch(id: string) {
    return new Promise<void>((resolve, reject) => {
      this.base('Match')
        .destroy([id])
        .then(() => resolve())
        .catch(reject);
    });
  }

  createResults(data: Result[]) {
    return new Promise<Result[]>((resolve, reject) => {
      this.base('Result')
        .create(data.map(result => ({ fields: { ...mapResultToRecord(result) } })))
        .then(records => resolve(records.map(mapRecordToResult)))
        .catch(reject);
    });
  }

  updateResults(data: Result[]) {
    return new Promise<Result[]>((resolve, reject) => {
      this.base('Result')
        .update(data.map(result => ({ id: result.id, fields: { ...mapResultToRecord(result) } })))
        .then(records => resolve(records.map(mapRecordToResult)))
        .catch(reject);
    });
  }

  deleteResults(data: Result[]) {
    return new Promise<Result[]>((resolve, reject) => {
      this.base('Result')
        .destroy(data.map(result => result.id))
        .then(records => resolve(records.map(mapRecordToResult)))
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
          records.forEach(record => users.push(userMapper(record)));
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
            return resolve(userMapper(records[0]));
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
        .then(record => resolve(userSessionMapper(record)))
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
        .then(record => resolve(userMapper(record)))
        .catch(reject);
    });
  }

  getSession(id: string) {
    return new Promise<Session>((resolve, reject) => {
      this.base('Session')
        .find(id)
        .then(record => resolve(sessionMapper(record)))
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
        .then(record => resolve(sessionMapper(record)))
        .catch(reject);
    });
  }

  getClubs() {
    return new Promise<Club[]>((resolve, reject) => {
      const clubs: Club[] = [];
      this.base('Club')
        .select({
          view: 'Grid view',
        })
        .eachPage((records, fetchNextPage) => {
          records.forEach(record => clubs.push(mapRecordToClub(record)));
          fetchNextPage();
        })
        .then(() => resolve(clubs))
        .catch(reject);
    });
  }
}