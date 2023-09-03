import styled from 'styled-components';
import { Action } from '@/modules/common/model';
import { LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import { User } from '@/modules/users/model';
import { useLoading } from '@/modules/common/hooks/useLoading';
import { LineUp } from '@/modules/lineups/model';
import { isUserInLineUp } from '@/modules/lineups/model/utils';
import { joinLineUp, leaveLineUp } from '@/modules/common/services/api';

const Actions = ({ lineUp, user, onUpdate }: Props) => {
  const userIsInLineUp = isUserInLineUp(lineUp, user);
  const canJoin = !userIsInLineUp;
  const isPastLineUp = new Date(lineUp.date) < new Date();
  const canLeave = userIsInLineUp && !isPastLineUp;
  const [joinStatus, setJoinStatus] = useLoading();
  const [leaveStatus, setLeaveStatus] = useLoading();

  const onClickAction = async (action: Action) => {
    try {
      if (action === 'leave') {
        setLeaveStatus('loading');
        const response = await leaveLineUp(lineUp.id);
        onUpdate(response.result as LineUp);
        setLeaveStatus('success');
      }
      if (action === 'join') {
        setJoinStatus('loading');
        const response = await joinLineUp(lineUp.id);
        onUpdate(response.result as LineUp);
        setJoinStatus('success');
      }
    } catch (e: any) {
      // TODO: Handle ApiError, show Toast message
      // e.status
      // e.data.message
    }
  };

  return (
    <Wrapper>
      {canLeave && (
        <LoadingButton loading={leaveStatus === 'loading'} color="secondary" onClick={() => onClickAction('leave')}>
          {`Salir`}
        </LoadingButton>
      )}
      {canJoin && (
        <LoadingButton loading={joinStatus === 'loading'} onClick={() => onClickAction('join')}>
          {`Me apunto`}
        </LoadingButton>
      )}
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
