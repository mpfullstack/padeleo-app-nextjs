import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable/Airtable';
import { getSession } from '@/modules/sessions/services/sessionService';
import { LineUp, ResponseLineUpData, ResponseSingleLineUpData } from '@/modules/lineups/model';
import { LineUpAirtableRepository } from '@/modules/lineups/repositories/LineUpAirtableRepository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseLineUpData | ResponseSingleLineUpData>
) {
  const session = await getSession(req);

  if (!session) return res.status(401).json({ success: false });

  const lineUpRepository = new LineUpAirtableRepository(new AirtableData());

  // Get Line Ups
  if (req.method === 'GET') {
    try {
      const { tab } = req.query;
      let result: LineUp[] | undefined;
      if (tab === 'coming') {
        result = await lineUpRepository.getComing();
      }
      if (tab === 'all') {
        result = await lineUpRepository.getAll();
      }
      return res.status(200).json({
        success: true,
        result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error,
      });
    }
  }
}
