import { AirtableData } from '@/database/Airtable/Airtable';
import { LineUp } from '@/modules/lineups/model';

export interface LineUpRepository {
  getAll(): Promise<LineUp[]>;
  getComing(): Promise<LineUp[]>;
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
}
