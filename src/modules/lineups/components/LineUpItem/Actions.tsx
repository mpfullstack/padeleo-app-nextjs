import styled from 'styled-components';
import { Action } from '@/modules/common/model';
import { User } from '@/modules/users/model';
import { LineUp } from '@/modules/lineups/model';
import { isUserInLineUp } from '@/modules/lineups/model/utils';
import { joinLineUp, leaveLineUp } from '@/modules/common/services/api';
import JoinLeaveActionButton from '@/modules/common/components/Buttons/JoinLeaveActionButton';

const Actions = ({ lineUp, user, onUpdate }: Props) => {
  const userIsInLineUp = isUserInLineUp(lineUp, user);
  const canJoin = !userIsInLineUp;
  const isPastLineUp = new Date(lineUp.date) < new Date();
  const canLeave = userIsInLineUp && !isPastLineUp;

  const onJoinLeaveAction = async (action: Action, onSuccess: () => void) => {
    try {
      const response = action === 'leave' ? await leaveLineUp(lineUp.id) : await joinLineUp(lineUp.id);
      onUpdate(response.result as LineUp);
      onSuccess();
    } catch (e: any) {
      // TODO: Handle ApiError, show Toast message
      // e.status
      // e.data.message
    }
  };

  return (
    <Wrapper>
      {(canLeave || canJoin) && (
        <JoinLeaveActionButton canJoin={canJoin} canLeave={canLeave} onClick={onJoinLeaveAction} />
      )}
    </Wrapper>
  );
  /**
   * TODO: If admin implement add/remove any player to the line up and also pick the ones for the final line up
   */
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: right;
  button {
    font-size: 1.3rem;
    margin: 0 0 0 1rem;
    width: auto;
  }
`;

interface Props {
  lineUp: LineUp;
  user?: User;
  onUpdate: (lineUp: LineUp) => void;
}

export default Actions;
