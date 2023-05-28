import { format as dateFormat } from '@/modules/common/services/dates';
import { Text } from './styles';

const Date = ({ date, format = 'EEEE dd/MM/yyyy' }: { date: string; format?: string }) => {
  return <Text>{dateFormat(date, format)}</Text>;
};

export default Date;
