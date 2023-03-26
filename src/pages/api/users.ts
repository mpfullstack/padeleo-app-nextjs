import type { NextApiRequest, NextApiResponse } from 'next';
import { AirtableData } from '@/database/Airtable/Airtable';
import { UserAirtableRepository } from '@/modules/users/repositories/UserAirtableRepository';
import { ResponseUserData, ResponseSingleUserData } from '@/modules/users/model';
import { getSession } from '@/modules/sessions/services/sessionService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseUserData | ResponseSingleUserData>
) {
  const session = await getSession(req);

  if (!session) return res.status(401).json({ success: false });

  const userRepository = new UserAirtableRepository(new AirtableData());

  if (req.method === 'POST') {
    try {
      const result = await userRepository.create(req.body);
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
