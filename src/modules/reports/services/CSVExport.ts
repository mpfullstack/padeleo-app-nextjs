import { AsyncParser } from '@json2csv/node';
import { Report } from '@/modules/reports/model';
import { Exporter } from '@/modules/reports/services/types';

export class CSVExport implements Exporter {
  async export(data: Report[]) {
    const opts = {
      fields: [
        {
          label: 'Jugador',
          value: 'username',
        },
        {
          label: 'Partidos jugados',
          value: 'playedMatches',
        },
        {
          label: 'Partidos completos',
          value: 'completedMatches',
        },
        {
          label: 'Partidos ganados',
          value: 'wonMatches',
        },
        {
          label: 'Partidos perdidos',
          value: 'lostMatches',
        },
        {
          label: 'Juegos a favor',
          value: 'wonGames',
        },
        {
          label: 'Juegos en contra',
          value: 'lostGames',
        },
      ],
    };
    const parser = new AsyncParser(opts);
    const csv = await parser.parse(data).promise();
    return csv;
  }
}
