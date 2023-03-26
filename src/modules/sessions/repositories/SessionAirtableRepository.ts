import { AirtableData } from '@/database/Airtable/Airtable';
import { Session } from '@/modules/sessions/model';

export interface SessionRepository {
  getById(id: string): Promise<Session>;
  create(userId: string): Promise<Session>;
  delete(id: string): Promise<void>;
}

export class SessionAirtableRepository implements SessionRepository {
  private database: AirtableData;

  constructor(database: AirtableData) {
    this.database = database;
  }

  async getById(id: string) {
    return await this.database.getSession(id);
  }

  async create(userId: string) {
    return await this.database.createSession(userId);
  }

  async delete(id: string) {
    return await this.database.deleteSession(id);
  }
}
