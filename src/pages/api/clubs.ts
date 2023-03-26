import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable/Airtable';
import { ClubAirtableRepository } from '@/modules/clubs/repositories/ClubAirtableRepository';
import { getSession } from '@/modules/sessions/services/sessionService';
import { ResponseClubData, ResponseSingleClubData } from '@/modules/clubs/model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseClubData | ResponseSingleClubData>
) {
  const session = await getSession(req);

  if (!session) return res.status(401).json({ success: false });

  const userRepository = new ClubAirtableRepository(new AirtableData());

  if (req.method === 'GET') {
    try {
      const result = await userRepository.getAll();
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
