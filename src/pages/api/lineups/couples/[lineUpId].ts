import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable/Airtable';
import { LineUpAirtableRepository } from '@/modules/lineups/repositories/LineUpAirtableRepository';
import { getSession } from '@/modules/sessions/services/sessionService';
import { LineUpCouple, ResponseLineUpCouplesData } from '@/modules/lineups/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseLineUpCouplesData>) {
  const session = await getSession(req);

  if (!session) return res.status(401).json({ success: false });

  const { lineUpId } = req.query;

  const airtableData = new AirtableData();
  const lineUpRepository = new LineUpAirtableRepository(airtableData);

  let lineUpCouples: LineUpCouple[] | undefined;
  if (req.method === 'GET') {
    try {
      lineUpCouples = await lineUpRepository.getCouples(lineUpId as string);

      if (lineUpCouples) {
        return res.status(200).json({
          success: true,
          result: lineUpCouples,
        });
      }
    } catch (e: any) {
      return res.status(e.statusCode).json({
        success: false,
        error: e.message,
      });
    }
    return res.status(400).json({
      success: false,
      error: 'Not found',
    });
  }
}
