import styled from 'styled-components';
import { Action, Match } from '@/modules/matches/model';
import { getMatchStatus, isUserInMatch } from '../../model/utils';
import { Button, LoadingButton } from '@/modules/common/components/Buttons';
import Drawer from '@/modules/common/components/Drawer';
import { User } from '@/modules/users/model';
import { joinMatch, leaveMatch } from '@/modules/common/services/api';
import { useLoading } from '@/modules/common/hooks/useLoading';
import { useState } from 'react';
import MatchResultsEditor from './MatchResult/MatchResultsEditor';

const Actions = ({ match, user, onUpdate }: Props) => {
  const isClosed = getMatchStatus(match) === 'closed';
  const isPastMatch = new Date(match.startTime) < new Date();
  const userIsInMatch = isUserInMatch(match, user);
  const canLeave = userIsInMatch && !isPastMatch;
  const canJoin = !isClosed && !isPastMatch && !userIsInMatch;
  const canAddOrModifyResult = isPastMatch && userIsInMatch && isClosed;
  const addOrModifyResultLabel = match.results?.length ? 'Editar resultado' : 'Añadir resultado';

  const [drawerOpened, setDrawerOpen] = useState<boolean>(false);
  const [leaveStatus, setLeaveStatus] = useLoading();
  const [joinStatus, setJoinStatus] = useLoading();

  const onClickAction = async (action: Action) => {
    try {
      if (action === 'leave') {
        setLeaveStatus('loading');
        const response = await leaveMatch(match.id);
        onUpdate(response.result as Match);
        setLeaveStatus('success');
      }
      if (action === 'join') {
        setJoinStatus('loading');
        const response = await joinMatch(match.id);
        onUpdate(response.result as Match);
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
      {canAddOrModifyResult && <Button onClick={() => setDrawerOpen(true)}>{addOrModifyResultLabel}</Button>}
      <Drawer anchor="bottom" open={drawerOpened} onClose={() => setDrawerOpen(false)}>
        <MatchResultsEditor match={match} onUpdate={onUpdate} />
      </Drawer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 1rem;
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
