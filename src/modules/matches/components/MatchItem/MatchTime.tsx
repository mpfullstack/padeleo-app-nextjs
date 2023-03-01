import { format, addSeconds } from '@/modules/common/services/dates';
import { Paragraph } from './styles';

const MatchTime = ({ startTime, duration }: { startTime: string; duration: number }) => {
  return (
    <Paragraph>
      {`De `}
      {format(startTime, 'H:mm')}
      {` a `}
      {format(addSeconds(new Date(startTime), duration).toString(), 'H:mm')}
    </Paragraph>
  );
};

export default MatchTime;
