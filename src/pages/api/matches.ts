import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable';
import { MatchAirtableRepository } from '@/modules/matches/repositories/MatchAirtableRepository';
import { ResponseMatchData, ResponseSingleMatchData } from '@/modules/matches/model';
import { SessionAirtableRepository } from '@/modules/sessions/repositories/SessionAirtableRepository';
import { Session } from '@/modules/sessions/model';

const isAuthenticated = async <T>(req: NextApiRequest, res: NextApiResponse<T>): Promise<Session | undefined> => {
  const token = req.cookies.token;
  if (!token) {
    return undefined;
  }

  const sessionRepository = new SessionAirtableRepository(new AirtableData());
  try {
    const t = new Date().getTime();
    const ses = await sessionRepository.getById(token);
    console.log((new Date().getTime() - t) / 1000);
    return ses;
  } catch (error: any) {
    return undefined;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMatchData | ResponseSingleMatchData>
) {
  const session = await isAuthenticated<ResponseMatchData | ResponseSingleMatchData>(req, res);
  if (!session) {
    return res.status(401).json({
      success: false,
    });
  }

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
