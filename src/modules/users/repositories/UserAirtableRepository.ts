import { AirtableData } from '@/database/Airtable';
import { User } from '@/modules/users/model';

export interface UserRepository {
  getAll(): Promise<User[]>;
  // getById(id: string): Promise<User>;
  create(data: User): Promise<User>;
  // update(cart: User): Promise<User>
}

export class UserAirtableRepository implements UserRepository {
  private database: AirtableData;

  constructor(database: AirtableData) {
    this.database = database;
  }

  async getAll(): Promise<User[]> {
    return await this.database.getUsers();
  }

  // async getById(id: string): Promise<User> {
  //   return await this.database.getUser(id);
  // }

  async create(data: User): Promise<User> {
    return await this.database.createUser(data);
  }
}
