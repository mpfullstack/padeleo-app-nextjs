import styled from 'styled-components';
import { User } from '@/modules/users/model';
import { LineUp } from '@/modules/lineups/model';
import JoinLeaveActionButton from '@/modules/common/components/Buttons/JoinLeaveActionButton';
import { isUserConvoked } from '@/modules/lineups/model/utils';
import { isAdmin } from '@/modules/users/utils';
import { callInPlayer, callOffPlayer } from '@/modules/common/services/api';
import { Action } from '@/modules/common/model';
import { LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import { onJoinLeaveLineUpAction } from '../../utils';

const Actions = ({ user, lineUp, player, onUpdate }: Props) => {
  const userIsConvoked = isUserConvoked(lineUp, player as User);
  const canLeave = userIsConvoked;
  const canJoin = !canLeave;

  const onJoinLeaveAction = async (action: Action, onSuccess: () => void) => {
    try {
      const response =
        action === 'join'
          ? await callInPlayer(lineUp.id, player.nickname)
          : await callOffPlayer(lineUp.id, player.nickname);
      onUpdate(response.result as LineUp);
      onSuccess();
    } catch (e: any) {
      // TODO: Handle ApiError, show Toast message
      // e.status
      // e.data.message
    }
  };

  const onRemovePlayer = async (player: User) =>
    await onJoinLeaveLineUpAction(lineUp, 'leave', onUpdate, undefined, player);

  return (
    <Wrapper>
      {isAdmin(user) && !userIsConvoked && (
        <LoadingButton color="error" onClick={() => onRemovePlayer(player)}>
          {`Quitar`}
        </LoadingButton>
      )}
      {isAdmin(user) && (
        <JoinLeaveActionButton
          canJoin={canJoin}
          joinText="Convocar"
          canLeave={canLeave}
          leaveText="Desconvocar"
          onClick={onJoinLeaveAction}
          size="small"
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 0;
  justify-content: right;
  button {
    font-size: 1.3rem;
    margin: 0 0 0 1rem;
    width: auto;
  }
`;

interface Props {
  user: User;
  lineUp: LineUp;
  player: User;
  onUpdate: (lineUp: LineUp) => void;
}

export default Actions;
