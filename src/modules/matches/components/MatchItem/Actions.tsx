import styled from 'styled-components';
import { Action, Match } from '@/modules/matches/model';
import { getMatchStatus, isUserInMatch } from '../../model/utils';
import { LoadingButton } from '@mui/lab';
import { User } from '@/modules/users/model';
import { joinMatch, leaveMatch } from '@/modules/common/services/api';
import { useLoading } from '@/modules/common/hooks/useLoading';

const Actions = ({ match, user, onUpdate }: Props) => {
  const isClosed = getMatchStatus(match) === 'closed';
  const userIsInMatch = isUserInMatch(match, user);
  const [leaveStatus, setLeaveStatus] = useLoading();
  const [joinStatus, setJoinStatus] = useLoading();

  const onClickAction = async (action: Action) => {
    try {
      if (action === 'leave') {
        setLeaveStatus('loading');
        const result = await leaveMatch(match.id as string);
        onUpdate(result.result as Match);
        setLeaveStatus('success');
      }
      if (action === 'join') {
        setJoinStatus('loading');
        const result = await joinMatch(match.id as string);
        onUpdate(result.result as Match);
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
      {userIsInMatch && (
        <LoadingButton
          loading={leaveStatus === 'loading'}
          color="secondary"
          variant="contained"
          onClick={() => onClickAction('leave')}
        >
          {`Salir`}
        </LoadingButton>
      )}
      {!userIsInMatch && !isClosed && (
        <LoadingButton loading={joinStatus === 'loading'} variant="contained" onClick={() => onClickAction('join')}>
          {`Me apunto`}
        </LoadingButton>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: flex;
  margin-top: auto;
  button {
    font-size: 1.3rem;
  }
`;

interface Props {
  match: Match;
  onUpdate: (match: Match) => void;
  user?: User;
}

export default Actions;
