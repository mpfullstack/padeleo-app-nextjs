import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable';
import { MatchAirtableRepository } from '@/modules/matches/repositories/MatchAirtableRepository';
import { Match, ResponseMatchData, ResponseSingleMatchData } from '@/modules/matches/model';
import { getSession } from '@/modules/sessions/services/sessionService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMatchData | ResponseSingleMatchData>
) {
  const session = await getSession(req);

  if (!session) return res.status(401).json({ success: false });

  const matchRepository = new MatchAirtableRepository(new AirtableData());

  // Create Match
  if (req.method === 'POST') {
    try {
      const result = await matchRepository.create(req.body);
      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error,
      });
    }
  }

  // Update match
  if (req.method === 'PUT') {
    try {
      const result = await matchRepository.update(req.body);
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

  // Get Matches
  if (req.method === 'GET') {
    try {
      const { tab } = req.query;
      let result: Match[] | undefined;
      if (tab === 'coming') {
        result = await matchRepository.getComing();
      }
      if (tab === 'past') {
        result = await matchRepository.getPast();
      }
      if (tab === 'all') {
        result = await matchRepository.getAll();
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
