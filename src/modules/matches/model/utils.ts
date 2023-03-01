import { Status } from '@/modules/matches/model';
import { Match } from '@/modules/matches/model';
import { User } from '@/modules/users/model';

export const getMatchStatus = (match: Match): Status => {
  return getMissingPlayers(match) > 0 ? 'opened' : 'closed';
};

export const getMissingPlayers = (match: Match): number => {
  const maxPlayers = match.maxPlayers || 4;
  return maxPlayers - match.players.length;
};

export const isUserInMatch = (match: Match, user?: User) => {
  return user && match.players.find((player: User) => player.id === user?.id);
};
