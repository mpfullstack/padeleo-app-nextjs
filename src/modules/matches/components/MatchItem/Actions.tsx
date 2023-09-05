import styled from 'styled-components';
import { Match } from '@/modules/matches/model';
import { Action } from '@/modules/common/model';
import { getMatchStatus, isUserInMatch } from '@/modules/matches/model/utils';
import { Button, LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import Drawer from '@/modules/common/components/Drawer';
import { User } from '@/modules/users/model';
import { joinMatch, leaveMatch, deleteMatch } from '@/modules/common/services/api';
import { isLoading } from '@/modules/common/hooks/useLoading';
import { useState } from 'react';
import MatchResultsEditor from './MatchResult/MatchResultsEditor';
import { useRouter } from 'next/router';
import AlertDialog from '@/modules/common/components/Dialog/AlertDialog';
import useCommonActions from '@/modules/common/hooks/useCommonActions';
import JoinLeaveActionButton from '@/modules/common/components/Buttons/JoinLeaveActionButton';

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

  const { deleteStatus, setDeleteStatus } = useCommonActions();
  const [drawerOpened, setDrawerOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<'delete' | ''>('');

  const onJoinLeaveAction = async (action: Action, onSuccess: () => void) => {
    try {
      const response = action === 'leave' ? await leaveMatch(match.id) : await joinMatch(match.id);
      onUpdate(response.result as Match);
      onSuccess();
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
      setDialogOpen('');
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
      {(canLeave || canJoin) && (
        <JoinLeaveActionButton canJoin={canJoin} canLeave={canLeave} onClick={onJoinLeaveAction} />
      )}
      {canAddOrModifyResult && <Button onClick={() => setDrawerOpen(true)}>{addOrModifyResultLabel}</Button>}
      {canEdit && <Button onClick={() => router.push({ pathname: `/matches/${match.id}` })}>{`Editar`}</Button>}
      {canDelete && (
        <>
          <LoadingButton color="error" loading={isLoading(deleteStatus)} onClick={() => setDialogOpen('delete')}>
            {`Eliminar`}
          </LoadingButton>
          <AlertDialog
            title="Eliminar partido"
            content="¿Estas seguro que quieres eliminar el partido?"
            open={dialogOpen === 'delete'}
            onClose={(confirm: boolean) => (confirm ? onDeleteMatch(match.id) : setDialogOpen(''))}
          />
        </>
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
