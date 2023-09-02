import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable/Airtable';
import { MatchAirtableRepository } from '@/modules/matches/repositories/MatchAirtableRepository';
import { getSession } from '@/modules/sessions/services/sessionService';
import { UserAirtableRepository } from '@/modules/users/repositories/UserAirtableRepository';
import { ResponseReportData } from '@/modules/reports/model';
import { User } from '@/modules/users/model';
import { AirtableReporter } from '@/modules/reports/services/report';
import { CSVExport } from '@/modules/reports/services/CSVExport';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseReportData>) {
  const session = await getSession(req);

  if (!session || !session.user?.admin) return res.status(401).json({ success: false });

  // Download report
  if (req.method === 'GET') {
    const airtableData = new AirtableData();
    const userRepository = new UserAirtableRepository(airtableData);
    const matchRepository = new MatchAirtableRepository(airtableData);

    try {
      const users = await userRepository.getAll();
      const promises = users.map((user: User) => matchRepository.getByUserNickname(user.nickname as string));
      const matchesByUser = await Promise.all(promises);
      const reporter = new AirtableReporter(new CSVExport());
      const reportData = reporter.generate({ users, matchesByUser });
      const reports = await reporter.export<any>(reportData);

      return res.status(200).setHeader('Content-Type', 'text/csv').send(reports);

      // return res.status(200).json({
      //   success: true,
      //   result: reportData,
      // });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error,
      });
    }
  }
}
