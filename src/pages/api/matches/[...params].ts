import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable';
import { MatchAirtableRepository } from '@/modules/matches/repositories/MatchAirtableRepository';
import { Match, ResponseSingleMatchData } from '@/modules/matches/model';
import { getSession } from '@/modules/sessions/services/sessionService';
import { Action } from '@/modules/matches/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseSingleMatchData>) {
  const session = await getSession(req);

  if (!session) return res.status(401).json({ success: false });

  const { params } = req.query;
  const [matchId, action] = params as [string, Action];
  const matchRepository = new MatchAirtableRepository(new AirtableData());

  let match: Match;
  if (req.method === 'PUT') {
    try {
      switch (action) {
        case 'join':
          match = await matchRepository.addPlayer(matchId, session.user);
          break;
        case 'leave':
          match = await matchRepository.removePlayer(matchId, session.user);
          break;
      }
      if (match) {
        return res.status(200).json({
          success: true,
          result: match,
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
