import { LineUp, LineUpCouple } from '@/modules/lineups/model';
import { Action } from '@/modules/common/model';
import { joinLineUp, leaveLineUp } from '@/modules/common/services/api';
import { User } from '@/modules/users/model';

export const updateLineUp = (lineUps: LineUp[], lineUpToUpdate: LineUp) => {
  return lineUps.map((lineUp: LineUp) => {
    if (lineUpToUpdate.id === lineUp.id) {
      return lineUpToUpdate;
    }
    return lineUp;
  });
};

export const onJoinLeaveLineUpAction = async (
  lineUp: LineUp,
  action: Action,
  onUpdate: (result: LineUp) => void,
  onSuccess?: () => void,
  player?: User
) => {
  try {
    const response =
      action === 'leave'
        ? await leaveLineUp(lineUp.id, player?.nickname || '')
        : await joinLineUp(lineUp.id, player?.nickname || '');
    onUpdate(response.result as LineUp);
    onSuccess && onSuccess();
  } catch (e: any) {
    // TODO: Handle ApiError, show Toast message
    // e.status
    // e.data.message
  }
};

export const sortCouples = (lineUpCouples: LineUpCouple[]) => {
  return lineUpCouples.sort((coupleA: LineUpCouple, coupleB: LineUpCouple) => {
    const totalScoreCoupleA = coupleA.playerScoreA + coupleA.playerScoreB;
    const totalScoreCoupleB = coupleB.playerScoreA + coupleB.playerScoreB;

    if (totalScoreCoupleA < totalScoreCoupleB) return 1;
    if (totalScoreCoupleA > totalScoreCoupleB) return -1;
    return 0;
  });
};

export const getCurrentPlayerCoupleIndex = (lineUpCouples: LineUpCouple[], playerId: string): number => {
  return lineUpCouples.findIndex(
    (couple: LineUpCouple) => couple.playerIdA === playerId || couple.playerIdB === playerId
  );
};

export const isPlayerIdInLineUpCouples = (couples: LineUpCouple[], playerId: string) =>
  getCurrentPlayerCoupleIndex(couples, playerId) !== -1;

export const updatePlayerPosition = (couple: LineUpCouple, position: string, playerId: string): LineUpCouple => {
  if (position === 'A') {
    couple.playerIdA = playerId;
  } else if (position === 'B') {
    couple.playerIdB = playerId;
  }

  return { ...couple };
};

export const updatePlayerScore = (couple: LineUpCouple, position: string, score: number): LineUpCouple => {
  if (position === 'A') {
    couple.playerScoreA = score;
  } else if (position === 'B') {
    couple.playerScoreB = score;
  }

  return { ...couple };
};
