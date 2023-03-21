import { format } from '@/modules/common/services/dates';
import { Text } from './styles';

const MatchDate = ({ date }: { date: string }) => {
  return <Text>{format(date, 'EEEE dd/MM/yyyy')}</Text>;
};

export default MatchDate;
