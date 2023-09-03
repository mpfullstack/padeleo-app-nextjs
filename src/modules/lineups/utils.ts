import { LineUp } from '@/modules/lineups/model';

export const updateLineUp = (lineUps: LineUp[], lineUpToUpdate: LineUp) => {
  return lineUps.map((lineUp: LineUp) => {
    if (lineUpToUpdate.id === lineUp.id) {
      return lineUpToUpdate;
    }
    return lineUp;
  });
};
