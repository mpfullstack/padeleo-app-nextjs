import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable';
import { MatchAirtableRepository } from '@/modules/matches/repositories/MatchAirtableRepository';
import { ResponseMatchData, ResponseSingleMatchData } from '@/modules/matches/model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMatchData | ResponseSingleMatchData>
) {
  const matchRepository = new MatchAirtableRepository(new AirtableData());

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

  if (req.method === 'GET') {
    try {
      const result = await matchRepository.getAll();
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
