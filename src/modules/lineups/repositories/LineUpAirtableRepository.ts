import { AirtableData } from '@/database/Airtable/Airtable';
import { LineUp, LineUpPlayer } from '@/modules/lineups/model';
import { User } from '@/modules/users/model';

export interface LineUpRepository {
  getAll(): Promise<LineUp[]>;
  getComing(): Promise<LineUp[]>;
  getById(id: string): Promise<LineUp>;
  update(data: LineUp): Promise<LineUp>;
  addPlayer(lineUpId: string, user: User): Promise<LineUp>;
}

export class LineUpAirtableRepository implements LineUpRepository {
  private database: AirtableData;

  constructor(database: AirtableData) {
    this.database = database;
  }

  async getAll(): Promise<LineUp[]> {
    return await this.database.getLineUps({
      sort: [{ field: 'date', direction: 'desc' }],
    });
  }

  async getComing(): Promise<LineUp[]> {
    return await this.database.getLineUps({
      filterByFormula: `DATETIME_DIFF({date}, TODAY(), 'hours') >= 0`,
      sort: [{ field: 'date', direction: 'asc' }],
    });
  }

  async getById(id: string): Promise<LineUp> {
    return await this.database.getLineUp(id);
  }

  async update(data: LineUp): Promise<LineUp> {
    return await this.database.updateLineUp(data);
  }

  async addPlayer(lineUpId: string, user: User): Promise<LineUp> {
    const lineUp = await this.getById(lineUpId);
    const isPlayerInLineUp = lineUp.players.find((player: LineUpPlayer) => player.id === user.id);

    if (!isPlayerInLineUp) {
      lineUp.players.push(user as LineUpPlayer);
      return await this.update(lineUp);
    }

    return Promise.resolve(lineUp);
  }

  async removePlayer(lineUpId: string, user: User): Promise<LineUp> {
    const lineUp = await this.getById(lineUpId);
    const isPlayerInLineUp = lineUp.players.find((player: LineUpPlayer) => player.id === user.id);

    if (isPlayerInLineUp) {
      lineUp.players = lineUp.players.filter((player: LineUpPlayer) => player.id !== user.id);
      return await this.update(lineUp);
    }

    return Promise.resolve(lineUp);
  }
}
