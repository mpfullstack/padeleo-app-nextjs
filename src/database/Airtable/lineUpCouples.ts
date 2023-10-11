import { Table, FieldSet } from 'airtable';
import { mapRecordToLineUpCouple, mapLineUpCoupleToRecord } from '@/database/Airtable/helpers';
import { LineUpCouple } from '@/modules/lineups/model';

const lineUpCouples = {
  get: function (table: Table<FieldSet>, lineUpId: string) {
    return new Promise<LineUpCouple[]>((resolve, reject) => {
      const lineUpCouples: LineUpCouple[] = [];
      table
        .select({
          view: 'Grid view',
          pageSize: 50,
          filterByFormula: encodeURI(`lineUpId='${lineUpId}'`),
        })
        .firstPage()
        .then(records => records.map(record => lineUpCouples.push(mapRecordToLineUpCouple(record))))
        .then(() => resolve(lineUpCouples))
        .catch(reject);
    });
  },
  delete: function (table: Table<FieldSet>, data: LineUpCouple[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      table
        .destroy(data.map(lineUpCouple => lineUpCouple.id))
        .then(() => resolve())
        .catch(reject);
    });
  },
  create: function (table: Table<FieldSet>, lineUpCouples: LineUpCouple[]): Promise<LineUpCouple[]> {
    return new Promise<LineUpCouple[]>((resolve, reject) => {
      const records = lineUpCouples.map((lineUpCouple: LineUpCouple) => ({
        fields: { ...mapLineUpCoupleToRecord(lineUpCouple) },
      }));
      table
        .create(records)
        .then(records => resolve(records.map(mapRecordToLineUpCouple)))
        .catch(reject);
    });
  },
};

export default lineUpCouples;
