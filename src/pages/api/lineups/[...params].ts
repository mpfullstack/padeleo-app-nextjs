import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable/Airtable';
import { LineUpAirtableRepository } from '@/modules/lineups/repositories/LineUpAirtableRepository';
import { getSession } from '@/modules/sessions/services/sessionService';
import { Action, LineUpAction } from '@/modules/common/model';
import { LineUp, ResponseSingleLineUpData } from '@/modules/lineups/model';
import { UserAirtableRepository } from '@/modules/users/repositories/UserAirtableRepository';
import { isAdmin } from '@/modules/users/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseSingleLineUpData>) {
  const session = await getSession(req);

  if (!session) return res.status(401).json({ success: false });

  const { params } = req.query;
  const [lineUpId, action, playerNickname] = params as [string, Action | LineUpAction, string];

  if (playerNickname && !isAdmin(session.user)) {
    return res.status(401).json({ success: false });
  }

  const airtableData = new AirtableData();
  const lineUpRepository = new LineUpAirtableRepository(airtableData);

  let player = session.user;
  if (playerNickname) {
    const userRepository = new UserAirtableRepository(airtableData);
    player = await userRepository.getByNickname(playerNickname);
    if (!player) {
      return res.status(400).json({ success: false });
    }
  }

  let lineUp: LineUp | undefined;
  if (req.method === 'PUT') {
    try {
      switch (action) {
        case 'join':
          lineUp = await lineUpRepository.addPlayer(lineUpId, player);
          break;
        case 'leave':
          lineUp = await lineUpRepository.removePlayer(lineUpId, player);
          break;
        case 'callin':
          lineUp = await lineUpRepository.callInPlayer(lineUpId, player);
          break;
        case 'calloff':
          lineUp = await lineUpRepository.callOffPlayer(lineUpId, player);
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
