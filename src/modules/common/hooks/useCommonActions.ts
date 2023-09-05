import { useLoading } from '@/modules/common/hooks/useLoading';

const useCommonActions = () => {
  const [leaveStatus, setLeaveStatus] = useLoading();
  const [joinStatus, setJoinStatus] = useLoading();
  const [deleteStatus, setDeleteStatus] = useLoading();

  return {
    leaveStatus,
    setLeaveStatus,
    joinStatus,
    setJoinStatus,
    deleteStatus,
    setDeleteStatus,
  };
};

export default useCommonActions;
