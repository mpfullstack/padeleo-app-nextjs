import ramdonstring from 'randomstring';
import { Match } from '@/modules/matches/model';
import { user } from '@/mocks/users/data';

export const match: Match = {
  id: 'recVKR5vW1tyEaDBI',
  clubId: 'recAf6pVtLtZrOtGA',
  clubName: 'Padel Indoor Lloret',
  startTime: '2023-02-08T12:00:00.000Z',
  duration: 5400,
  players: [user],
  courtBooked: true,
};

export const closedMatch = {
  ...match,
  players: [
    { ...user, id: ramdonstring.generate() },
    { ...user, id: ramdonstring.generate() },
    { ...user, id: ramdonstring.generate() },
    { ...user, id: ramdonstring.generate() },
  ],
};
