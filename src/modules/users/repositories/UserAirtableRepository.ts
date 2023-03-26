import { AirtableData } from '@/database/Airtable/Airtable';
import { User } from '@/modules/users/model';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getByNickname(nickname: string): Promise<User>;
  create(data: User): Promise<User>;
  getBySessionId(id: string): Promise<User>;
}

export class UserAirtableRepository implements UserRepository {
  private database: AirtableData;

  constructor(database: AirtableData) {
    this.database = database;
  }

  async getAll(): Promise<User[]> {
    return await this.database.getUsers();
  }

  async getByNickname(nickname: string): Promise<User> {
    return await this.database.getUserByNickname(nickname);
  }

  async getBySessionId(id: string): Promise<User> {
    return await this.database.getUserBySessionId(id);
  }

  async create(data: User): Promise<User> {
    return await this.database.createUser(data);
  }
}
