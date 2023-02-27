import { Match } from '@/modules/matches/model';

const player = {
  id: 'rec6sgk6ItqEXkqIU',
  firstname: 'Marc',
  lastname: '',
  email: '',
};

export const match: Match = {
  id: 'recVKR5vW1tyEaDBI',
  clubId: 'recAf6pVtLtZrOtGA',
  clubName: 'Padel Indoor Lloret',
  startTime: '2023-02-08T12:00:00.000Z',
  duration: 5400,
  players: [player],
};

export const closedMatch = {
  ...match,
  players: [{ ...player }, { ...player }, { ...player }, { ...player }],
};
