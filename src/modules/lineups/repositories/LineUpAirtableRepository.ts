import { AirtableData } from '@/database/Airtable/Airtable';
import { LineUp, LineUpCouple, LineUpPlayer } from '@/modules/lineups/model';
import { User } from '@/modules/users/model';
import { isUserConvoked } from '../model/utils';

export interface LineUpRepository {
  getAll(): Promise<LineUp[]>;
  getComing(): Promise<LineUp[]>;
  getById(id: string): Promise<LineUp>;
  update(data: LineUp): Promise<LineUp>;
  addPlayer(lineUpId: string, user: User): Promise<LineUp>;
  removePlayer(lineUpId: string, user: User): Promise<LineUp>;
  callInPlayer(lineUpId: string, user: User): Promise<LineUp>;
  callOffPlayer(lineUpId: string, user: User): Promise<LineUp>;
  getCouples(lineUpId: string): Promise<LineUpCouple[]>;
  updateLineUpCouples(lineUpId: string, lineUpCouples: LineUpCouple[]): Promise<LineUpCouple[]>;
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

  async callInPlayer(lineUpId: string, user: User): Promise<LineUp> {
    const lineUp = await this.getById(lineUpId);

    if (!isUserConvoked(lineUp, user)) {
      lineUp.convokedPlayers.push(user as LineUpPlayer);
      return await this.update(lineUp);
    }

    return Promise.resolve(lineUp);
  }

  async callOffPlayer(lineUpId: string, user: User): Promise<LineUp> {
    const lineUp = await this.getById(lineUpId);

    if (isUserConvoked(lineUp, user)) {
      lineUp.convokedPlayers = lineUp.convokedPlayers.filter((player: LineUpPlayer) => player.id !== user.id);
      return await this.update(lineUp);
    }

    return Promise.resolve(lineUp);
  }

  async getCouples(lineUpId: string): Promise<LineUpCouple[]> {
    return await this.database.getLineUpCouples(lineUpId);
  }

  async updateLineUpCouples(_: string, lineUpCouples: LineUpCouple[]) {
    const lineUpCouplesToDelete = lineUpCouples.filter((lineUpCouple: LineUpCouple) => lineUpCouple.id);
    lineUpCouplesToDelete.length && (await this.database.deleteLineUpCouples(lineUpCouplesToDelete));
    return await this.database.createLineUpCouples(lineUpCouples);
  }
}
