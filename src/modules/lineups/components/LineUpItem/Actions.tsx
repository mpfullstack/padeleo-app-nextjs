import styled from 'styled-components';
import { Action } from '@/modules/common/model';
import { User } from '@/modules/users/model';
import { LineUp } from '@/modules/lineups/model';
import { isUserConvoked, isUserInLineUp } from '@/modules/lineups/model/utils';
import JoinLeaveActionButton from '@/modules/common/components/Buttons/JoinLeaveActionButton';
import { onJoinLeaveLineUpAction } from '../../utils';

const Actions = ({ lineUp, user, onUpdate }: Props) => {
  const userIsInLineUp = isUserInLineUp(lineUp, user);
  const userIsConvoked = isUserConvoked(lineUp, user);
  const canJoin = !userIsInLineUp;
  const isPastLineUp = new Date(lineUp.date) < new Date();
  const canLeave = userIsInLineUp && !isPastLineUp && !userIsConvoked;

  const onJoinLeaveAction = async (action: Action, onSuccess: () => void) => {
    await onJoinLeaveLineUpAction(lineUp, action, onUpdate, onSuccess);
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
