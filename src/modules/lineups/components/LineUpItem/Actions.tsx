import styled from 'styled-components';
import { Action } from '@/modules/matches/model';
import { LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import { User } from '@/modules/users/model';
import { useLoading } from '@/modules/common/hooks/useLoading';
import { LineUp } from '@/modules/lineups/model';
import { isUserInLineUp } from '@/modules/lineups/model/utils';

const Actions = ({ lineUp, user }: Props) => {
  const userIsInLineUp = isUserInLineUp(lineUp, user);
  const canJoin = !userIsInLineUp;
  const [joinStatus, setJoinStatus] = useLoading();

  const onClickAction = async (action: Action) => {
    setJoinStatus('loading');
    // try {
    //   if (action === 'leave') {
    //     setLeaveStatus('loading');
    //     const response = await leaveMatch(match.id);
    //     onUpdate(response.result as Match);
    //     setLeaveStatus('success');
    //   }
    //   if (action === 'join') {
    //     setJoinStatus('loading');
    //     const response = await joinMatch(match.id);
    //     onUpdate(response.result as Match);
    //     setJoinStatus('success');
    //   }
    // } catch (e: any) {
    //   // TODO: Handle ApiError, show Toast message
    //   // e.status
    //   // e.data.message
    // }
  };

  return (
    <Wrapper>
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
}

export default Actions;
