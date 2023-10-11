import { format, addSeconds } from '@/modules/common/services/dates';
import { Text } from '@/modules/common/components/styles';

const MatchTime = ({ startTime, duration }: { startTime: string; duration: number }) => {
  return (
    <Text>
      {`De `}
      {format(startTime, 'H:mm')}
      {` a `}
      {format(addSeconds(new Date(startTime), duration).toString(), 'H:mm')}
    </Text>
  );
};

export default MatchTime;
