import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseUserData, ResponseSingleUserData } from '@/modules/users/model';
import { isAuthenticated } from '@/modules/sessions/services/sessionService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseUserData | ResponseSingleUserData>
) {
  if (req.method === 'GET') {
    try {
      const isAuth = await isAuthenticated(req);

      if (isAuth) return res.status(200).json({ success: true });

      return res.status(401).json({ success: false });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error,
      });
    }
  }
}
