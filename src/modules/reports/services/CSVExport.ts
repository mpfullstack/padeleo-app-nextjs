import { AsyncParser } from '@json2csv/node';
import { Report } from '@/modules/reports/model';
import { Exporter } from '@/modules/reports/services/types';

export class CSVExport implements Exporter {
  async export(data: Report[]) {
    const parser = new AsyncParser();
    const csv = await parser.parse(data).promise();
    return csv;
  }
}
