import { LineUp, LineUpPlayer } from '@/modules/lineups/model';
import { User } from '@/modules/users/model';

export const isUserInLineUp = (lineUp: LineUp, user?: User) => {
  return user && lineUp.players.find((player: LineUpPlayer) => player.id === user?.id);
};
