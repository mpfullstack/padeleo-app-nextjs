import { AirtableData } from '@/database/Airtable';
import { Match } from '@/modules/matches/model';

export interface MatchRepository {
  getAll(): Promise<Match[]>;
  getByUserNickname(nickname: string): Promise<Match[]>;
  getById(id: string): Promise<Match>;
  create(data: Match): Promise<Match>;
  // update(cart: Match): Promise<Match>
}

export class MatchAirtableRepository implements MatchRepository {
  private database: AirtableData;

  constructor(database: AirtableData) {
    this.database = database;
  }

  async getAll(): Promise<Match[]> {
    return await this.database.getMatches();
  }

  async getByUserNickname(nickname: string): Promise<Match[]> {
    return await this.database.getMatches(`FIND('${nickname}',ARRAYJOIN({players},' '))`);
  }

  async getById(id: string): Promise<Match> {
    return await this.database.getMatch(id);
  }

  async create(data: Match): Promise<Match> {
    return await this.database.createMatch(data);
  }
}
