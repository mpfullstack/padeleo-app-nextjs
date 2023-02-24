import type { NextApiRequest } from 'next';
import { AirtableData } from '@/database/Airtable';
import { SessionAirtableRepository } from '@/modules/sessions/repositories/SessionAirtableRepository';
import { Session } from '@/modules/sessions/model';

export const getSession = async (req: NextApiRequest): Promise<Session | undefined> => {
  const token = req.cookies.token;

  if (!token) return undefined;

  try {
    return await new SessionAirtableRepository(new AirtableData()).getById(token);
  } catch (error: any) {
    return undefined;
  }
};
