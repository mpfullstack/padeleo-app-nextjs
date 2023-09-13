import { LineUp } from '@/modules/lineups/model';
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
