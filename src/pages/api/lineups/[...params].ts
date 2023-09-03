import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable/Airtable';
import { LineUpAirtableRepository } from '@/modules/lineups/repositories/LineUpAirtableRepository';
import { getSession } from '@/modules/sessions/services/sessionService';
import { Action } from '@/modules/common/model';
import { LineUp, ResponseSingleLineUpData } from '@/modules/lineups/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseSingleLineUpData>) {
  const session = await getSession(req);

  if (!session) return res.status(401).json({ success: false });

  const { params } = req.query;
  const [lineUpId, action] = params as [string, Action];
  const lineUpRepository = new LineUpAirtableRepository(new AirtableData());

  let lineUp: LineUp | undefined;
  if (req.method === 'PUT') {
    try {
      switch (action) {
        case 'join':
          lineUp = await lineUpRepository.addPlayer(lineUpId, session.user);
          break;
        case 'leave':
          lineUp = await lineUpRepository.removePlayer(lineUpId, session.user);
          break;
      }
      if (lineUp) {
        return res.status(200).json({
          success: true,
          result: lineUp,
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
