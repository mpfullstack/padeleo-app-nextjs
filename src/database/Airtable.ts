import Airtable, { FieldSet, Record } from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import { Match } from '@/modules/matches/model';
import { User } from '@/modules/users/model';
import { Session } from '@/modules/sessions/model';

export class AirtableData {
  private base: AirtableBase;

  constructor() {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
    });
    this.base = Airtable.base(process.env.AIRTABLE_BASE as string);
  }

  private matchMapper(record: Record<FieldSet>): Match {
    const playerIds = (record.get('players') as string[]) || [];
    const playersNicknames = (record.get('playersNicknames') as string[]) || [];
    const playersFirstnames = (record.get('playersFirstnames') as string[]) || [];

    return {
      id: record.id,
      club: record.get('club') as string,
      startTime: new Date(record.get('startTime') as string),
      duration: record.get('duration') as number,
      players: playerIds.map((playerId: string, i: number) => {
        return {
          id: playerId,
          firstname: playersFirstnames[i],
          nickname: playersNicknames[i],
        } as User;
      }),
    };
  }

  private userMapper(record: Record<FieldSet>): User {
    return {
      id: record.id,
      firstname: record.get('firstname') as string,
      lastname: record.get('lastname') as string,
      email: record.get('email') as string,
      nickname: record.get('nickname') as string,
    };
  }

  private sessionMapper(record: Record<FieldSet>): Session {
    return {
      id: record.id,
      userId: record.get('userId') as string,
    };
  }

  private userSessionMapper(record: Record<FieldSet>): User {
    return {
      ...this.userMapper(record),
      id: record.get('userId') as string,
    };
  }

  getMatches() {
    return new Promise<Match[]>((resolve, reject) => {
      const matches: Match[] = [];
      this.base('Match')
        .select({
          view: 'Grid view',
        })
        .eachPage((records, fetchNextPage) => {
          records.forEach(record => matches.push(this.matchMapper(record)));
          fetchNextPage();
        })
        .then(() => resolve(matches))
        .catch(reject);
    });
  }

  getMatch(id: string) {
    return new Promise<Match>((resolve, reject) => {
      this.base('Match')
        .find(id)
        .then(record => resolve(this.matchMapper(record)))
        .catch(reject);
    });
  }

  createMatch(data: Match) {
    return new Promise<Match>((resolve, reject) => {
      const match = {
        ...data,
        startTime: data.startTime?.toString(),
        players: data.players.map(player => player.id as string),
      };
      this.base('Match')
        .create(match)
        .then(record => resolve(this.matchMapper(record)))
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
