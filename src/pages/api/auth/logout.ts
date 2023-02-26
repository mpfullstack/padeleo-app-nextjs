import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { ResponseData } from '@/modules/common/model';
import { User } from '@/modules/users/model';
import { SignInPayload } from '@/modules/user-access/model';
import { deleteSession } from '@/modules/sessions/services/sessionService';

interface SignInRequest extends NextApiRequest {
  body: SignInPayload;
}

export default async function handler(req: SignInRequest, res: NextApiResponse<ResponseData<User>>) {
  if (req.method === 'POST') {
    await deleteSession(req);

    res.setHeader(
      'Set-Cookie',
      serialize('token', 'deleted', {
        path: '/',
        httpOnly: true,
        maxAge: 0,
      })
    );

    return res.status(200).json({ success: true });
  }
}
