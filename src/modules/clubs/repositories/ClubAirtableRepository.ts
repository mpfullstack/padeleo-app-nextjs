import { AirtableData } from '@/database/Airtable';
import { Club } from '@/modules/clubs/model';

export interface UserRepository {
  getAll(): Promise<Club[]>;
}

export class ClubAirtableRepository implements UserRepository {
  private database: AirtableData;

  constructor(database: AirtableData) {
    this.database = database;
  }

  async getAll(): Promise<Club[]> {
    return await this.database.getClubs();
  }
}
