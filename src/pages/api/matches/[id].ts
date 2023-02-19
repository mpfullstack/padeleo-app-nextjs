import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable';
import { MatchAirtableRepository } from '@/modules/matches/repositories/MatchAirtableRepository';
import { ResponseSingleMatchData } from '@/modules/matches/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseSingleMatchData>) {
  const matchRepository = new MatchAirtableRepository(new AirtableData());

  if (req.method === 'POST') {
    // TODO: Implement
  }

  if (req.method === 'GET') {
    try {
      const result = await matchRepository.getById(req.query.id as string);
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
