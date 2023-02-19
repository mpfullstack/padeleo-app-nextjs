import Airtable, { FieldSet, Record } from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import { Match } from '@/modules/matches/model';
import { User } from '@/modules/users/model';

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

  getMatches(): Promise<Match[]> {
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

  getMatch(id: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.base('Match')
        .find(id)
        .then(record => resolve(this.matchMapper(record)))
        .catch(reject);
    });
  }

  createMatch(data: Match): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      const match = {
        ...data,
        startTime: data.startTime?.toString(),
        players: data.players.map(player => player.id),
      };
      this.base('Match')
        .create(match)
        .then(record => resolve(this.matchMapper(record)))
        .catch(reject);
    });
  }

  getUsers(): Promise<User[]> {
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
}
