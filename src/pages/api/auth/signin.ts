import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { AirtableData } from '@/database/Airtable/Airtable';
import { UserAirtableRepository } from '@/modules/users/repositories/UserAirtableRepository';
import { SessionAirtableRepository } from '@/modules/sessions/repositories/SessionAirtableRepository';
import { ResponseData } from '@/modules/common/model';
import { User } from '@/modules/users/model';
import { SignInPayload } from '@/modules/user-access/model';

interface SignInRequest extends NextApiRequest {
  body: SignInPayload;
}

export default async function handler(req: SignInRequest, res: NextApiResponse<ResponseData<User>>) {
  if (req.method === 'POST') {
    try {
      const airtableData = new AirtableData();
      const userRepository = new UserAirtableRepository(airtableData);
      const user = await userRepository.getByNickname(req.body.nickname);

      if (user && req.body.password === process.env.PADELEO_PASSWORD) {
        const sessionRepository = new SessionAirtableRepository(airtableData);
        const session = await sessionRepository.create(user.id as string);

        res.setHeader(
          'Set-Cookie',
          serialize('token', session.id, {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 90, // 90 days
          })
        );

        return res.status(200).json({
          success: true,
          result: user,
        });
      }
    } catch (error: any) {
      let code = 500;
      if (error.message === 'user_not_found') {
        code = 400;
      }
      return res.status(code).json({
        success: false,
        error,
      });
    }
  }

  return res.status(400).json({
    success: false,
  });
}
