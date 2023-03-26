import { AirtableData } from '@/database/Airtable/Airtable';
import { Match } from '@/modules/matches/model';
import { User } from '@/modules/users/model';
import { ApiError } from 'next/dist/server/api-utils';

export interface MatchRepository {
  getAll(): Promise<Match[]>;
  getComing(): Promise<Match[]>;
  getPast(): Promise<Match[]>;
  getByUserNickname(nickname: string): Promise<Match[]>;
  getById(id: string): Promise<Match>;
  create(data: Match): Promise<Match>;
  deleteById(id: string): Promise<void>;
  update(data: Match): Promise<Match>;
  addPlayer(matchId: string, user: User): Promise<Match>;
}

export class MatchAirtableRepository implements MatchRepository {
  private database: AirtableData;

  constructor(database: AirtableData) {
    this.database = database;
  }

  async getAll(): Promise<Match[]> {
    return await this.database.getMatches({
      sort: [{ field: 'startTime', direction: 'desc' }],
    });
  }

  async getComing(): Promise<Match[]> {
    return await this.database.getMatches({
      filterByFormula: `DATETIME_DIFF({startTime}, TODAY(), 'hours') >= 0`,
      sort: [{ field: 'startTime', direction: 'asc' }],
    });
  }

  async getPast(): Promise<Match[]> {
    return await this.database.getMatches({
      filterByFormula: `DATETIME_DIFF({startTime}, TODAY(), 'hours') < 0`,
      sort: [{ field: 'startTime', direction: 'desc' }],
    });
  }

  async getByUserNickname(nickname: string): Promise<Match[]> {
    return await this.database.getMatches({
      filterByFormula: `FIND('${nickname}',ARRAYJOIN({players},' '))`,
      sort: [{ field: 'startTime', direction: 'desc' }],
    });
  }

  async getById(id: string): Promise<Match> {
    return await this.database.getMatch(id);
  }

  async create(data: Match): Promise<Match> {
    return await this.database.createMatch(data);
  }

  async deleteById(matchId: string): Promise<void> {
    return await this.database.deleteMatch(matchId);
  }

  async update(data: Match): Promise<Match> {
    return await this.database.updateMatch(data);
  }

  async addPlayer(matchId: string, user: User): Promise<Match> {
    const match = await this.getById(matchId);
    const isPlayerInMatch = match.players.find((player: User) => player.id === user.id);

    if (!isPlayerInMatch) {
      if (match.maxPlayers === match.players.length) {
        return Promise.reject(new ApiError(403, 'Match is already full'));
      }
      match.players.push(user);
      return await this.update(match);
    }

    return Promise.resolve(match);
  }

  async removePlayer(matchId: string, user: User): Promise<Match> {
    const match = await this.getById(matchId);
    const isPlayerInMatch = match.players.find((player: User) => player.id === user.id);

    if (isPlayerInMatch) {
      match.players = match.players.filter((player: User) => player.id !== user.id);
      return await this.update(match);
    }

    return Promise.resolve(match);
  }
}
