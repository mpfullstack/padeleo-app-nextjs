import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { AirtableData } from '@/database/Airtable';
import { UserAirtableRepository } from '@/modules/users/repositories/UserAirtableRepository';
import { SessionAirtableRepository } from '@/modules/sessions/repositories/SessionAirtableRepository';
import { ResponseData } from '@/modules/common/model';
import { User } from '@/modules/users/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData<User>>) {
  const airtableData = new AirtableData();
  const userRepository = new UserAirtableRepository(airtableData);
  const sessionRepository = new SessionAirtableRepository(airtableData);

  if (req.method === 'POST') {
    try {
      const user = await userRepository.getByNickname(req.body.nickname);

      // TODO: Check for password
      // If correct password, create session for user and set Cookie
      const session = await sessionRepository.create(user.id as string);
      res.setHeader('Set-Cookie', serialize('token', session.id, { path: '/' }));

      return res.status(200).json({
        success: true,
        result: user,
      });
    } catch (error: any) {
      let code = 500;
      if (error.message === 'user_not_found') {
        code = 404;
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