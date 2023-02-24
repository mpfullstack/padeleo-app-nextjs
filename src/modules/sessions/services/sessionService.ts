import type { NextApiRequest } from 'next';
import { AirtableData } from '@/database/Airtable';
import { SessionAirtableRepository } from '@/modules/sessions/repositories/SessionAirtableRepository';
import { Session } from '@/modules/sessions/model';

const getToken = (req: NextApiRequest): string | undefined => {
  return req.cookies.token;
};

export const getSession = async (req: NextApiRequest): Promise<Session | undefined> => {
  const token = getToken(req);

  if (!token) return undefined;

  try {
    return await new SessionAirtableRepository(new AirtableData()).getById(token);
  } catch (error: any) {
    return undefined;
  }
};

export const isAuthenticated = async (req: NextApiRequest): Promise<boolean> => {
  const token = getToken(req);

  if (!token) return false;

  try {
    return (await new SessionAirtableRepository(new AirtableData()).getById(token)) ? true : false;
  } catch (error: any) {
    return false;
  }
};
