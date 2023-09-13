import { useState } from 'react';
import styled from 'styled-components';
import { Action } from '@/modules/common/model';
import { User } from '@/modules/users/model';
import { LineUp } from '@/modules/lineups/model';
import { isUserConvoked, isUserInLineUp } from '@/modules/lineups/model/utils';
import JoinLeaveActionButton from '@/modules/common/components/Buttons/JoinLeaveActionButton';
import { onJoinLeaveLineUpAction } from '../../utils';
import { isAdmin } from '@/modules/users/utils';
import { Button } from '@/modules/common/components/Buttons/Buttons';
import Drawer from '@/modules/common/components/Drawer';
import LineUpCouplesEditor from './LineUpCouplesEditor';

const Actions = ({ lineUp, user, onUpdate }: Props) => {
  const [drawerOpened, setDrawerOpen] = useState<boolean>(false);

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
      {isAdmin(user) && <Button onClick={() => setDrawerOpen(true)}>{`Parejas`}</Button>}
      {(canLeave || canJoin) && (
        <JoinLeaveActionButton canJoin={canJoin} canLeave={canLeave} onClick={onJoinLeaveAction} />
      )}
      <Drawer anchor="bottom" open={drawerOpened} onClose={() => setDrawerOpen(false)}>
        <LineUpCouplesEditor lineUp={lineUp} onUpdate={() => {}} />
      </Drawer>
    </Wrapper>
  );
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
