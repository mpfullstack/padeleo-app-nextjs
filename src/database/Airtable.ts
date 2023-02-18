import Airtable, { FieldSet, Record } from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import { Match } from '@/modules/matches/model';

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
    return {
      id: record.id,
      club: record.get('club') as string,
      startTime: new Date(record.get('startTime') as string),
      duration: record.get('duration') as number,
      players: record.get('players') as string[],
    };
  }

  async getMatches(): Promise<Match[]> {
    return await new Promise<Match[]>((resolve, reject) => {
      const matches: Match[] = [];
      this.base('Match')
        .select({
          maxRecords: 10,
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

  async getMatch(id: string): Promise<Match> {
    return await new Promise<Match>((resolve, reject) => {
      this.base('Match')
        .find(id)
        .then(record => resolve(this.matchMapper(record)))
        .catch(reject);
    });
  }

  async createMatch(data: Match): Promise<Match> {
    return await new Promise<Match>((resolve, reject) => {
      const match = {
        ...data,
        startTime: data.startTime?.toString(),
      };
      this.base('Match')
        .create(match)
        .then(record => resolve(this.matchMapper(record)))
        .catch(reject);
    });
  }
}
