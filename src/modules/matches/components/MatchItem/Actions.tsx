import styled from 'styled-components';
import { Action, Match } from '@/modules/matches/model';
import { getMatchStatus, isUserInMatch } from '../../model/utils';
import { Button, LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import Drawer from '@/modules/common/components/Drawer';
import { User } from '@/modules/users/model';
import { joinMatch, leaveMatch, deleteMatch } from '@/modules/common/services/api';
import { useLoading } from '@/modules/common/hooks/useLoading';
import { useState } from 'react';
import MatchResultsEditor from './MatchResult/MatchResultsEditor';
import { useRouter } from 'next/router';

const Actions = ({ match, user, onUpdate, onDelete }: Props) => {
  const router = useRouter();
  const isUserAdmin = !!user?.admin;
  const isClosed = getMatchStatus(match) === 'closed';
  const isPastMatch = new Date(match.startTime) < new Date();
  const userIsInMatch = isUserInMatch(match, user);
  const canLeave = userIsInMatch && !isPastMatch;
  const canJoin = !isClosed && !isPastMatch && !userIsInMatch;
  const canAddOrModifyResult = isPastMatch && isClosed && (userIsInMatch || isUserAdmin);
  const canEdit = !isPastMatch && isUserAdmin;
  const canDelete = isUserAdmin;
  const addOrModifyResultLabel = match.results?.length ? 'Editar resultado' : 'Añadir resultado';

  const [drawerOpened, setDrawerOpen] = useState<boolean>(false);
  const [leaveStatus, setLeaveStatus] = useLoading();
  const [joinStatus, setJoinStatus] = useLoading();
  const [deleteStatus, setDeleteStatus] = useLoading();

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

  const onResultAdded = (match: Match) => {
    setDrawerOpen(false);
    onUpdate(match);
  };

  const onDeleteMatch = async (id: string) => {
    try {
      setDeleteStatus('loading');
      await deleteMatch(id);
      onDelete(id);
      setDeleteStatus('success');
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
      {canEdit && <Button onClick={() => router.push({ pathname: `/matches/${match.id}` })}>{`Editar`}</Button>}
      {canDelete && (
        <LoadingButton color="error" loading={deleteStatus === 'loading'} onClick={() => onDeleteMatch(match.id)}>
          {`Eliminar`}
        </LoadingButton>
      )}
      <Drawer anchor="bottom" open={drawerOpened} onClose={() => setDrawerOpen(false)}>
        <MatchResultsEditor match={match} onUpdate={onResultAdded} />
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
  match: Match;
  onUpdate: (match: Match) => void;
  onDelete: (matchId: string) => void;
  user?: User;
}

export default Actions;
