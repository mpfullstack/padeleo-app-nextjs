import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable';
import { getSession } from '@/modules/sessions/services/sessionService';
import { ResultAirtableRepository } from '@/modules/results/repositories/ResultAirtableRepository';
import { ResponseResultsData } from '@/modules/results/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseResultsData>) {
  const session = await getSession(req);

  if (!session) return res.status(401).json({ success: false });

  const resultRepository = new ResultAirtableRepository(new AirtableData());

  // Create Results
  if (req.method === 'POST') {
    try {
      const result = await resultRepository.updateResults(req.body);
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
