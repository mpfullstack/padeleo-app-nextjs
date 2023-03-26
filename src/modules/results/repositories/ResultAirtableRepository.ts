import { AirtableData } from '@/database/Airtable/Airtable';
import { Result } from '@/modules/results/model';

export interface ResultRepository {
  updateResults(data: Result[]): Promise<Result[]>;
}

export class ResultAirtableRepository implements ResultRepository {
  private database: AirtableData;

  constructor(database: AirtableData) {
    this.database = database;
  }

  async updateResults(data: Result[]): Promise<Result[]> {
    const resultsToDelete = data.filter((result: Result) => result.id && !result.home && !result.away);
    resultsToDelete.length && (await this.database.deleteResults(resultsToDelete));

    const resultsToUpdate = data.filter((result: Result) => result.id && (result.home || result.away));
    const updatedResults = resultsToUpdate.length ? await this.database.updateResults(resultsToUpdate) : [];

    const resultsToCreate = data.filter((result: Result) => !result.id);
    const createdResults = resultsToCreate.length ? await this.database.createResults(resultsToCreate) : [];

    return [...updatedResults, ...createdResults];
  }
}
