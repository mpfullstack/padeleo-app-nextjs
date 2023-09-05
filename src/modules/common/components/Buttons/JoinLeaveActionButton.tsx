import { Action } from '@/modules/common/model';
import { LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import { isLoading } from '@/modules/common/hooks/useLoading';
import useCommonActions from '@/modules/common/hooks/useCommonActions';

const JoinLeaveActionButton = ({ canLeave, canJoin, onClick }: Props) => {
  const { leaveStatus, setLeaveStatus, joinStatus, setJoinStatus } = useCommonActions();

  const onClickAction = async (action: Action) => {
    action === 'leave' ? setLeaveStatus('loading') : setJoinStatus('loading');
    onClick(action, () => setLeaveStatus('success'));
  };

  return (
    <>
      {(canLeave || canJoin) && (
        <LoadingButton
          loading={canLeave ? isLoading(leaveStatus) : isLoading(joinStatus)}
          color={canLeave ? 'secondary' : 'primary'}
          onClick={() => onClickAction(canLeave ? 'leave' : 'join')}
        >
          {canLeave ? `Salir` : `Me apunto`}
        </LoadingButton>
      )}
    </>
  );
};

interface Props {
  canJoin: boolean;
  canLeave?: boolean;
  onClick: (action: Action, onSuccess: () => void) => void;
}

export default JoinLeaveActionButton;
