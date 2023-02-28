import People from '@/modules/common/icons/People';
import Badge from '@/modules/common/components/Badge';
import Tooltip from '@/modules/common/components/Tooltip';
import { User } from '@/modules/users/model';
import { Wrapper, Text, Span } from './styles';
import Done from '@/modules/common/icons/Done';
import Tag from '@/modules/common/components/Tag';

type Status = 'opened' | 'closed';

const MatchStatus = ({ players = [], maxPlayers = 4 }: { players: User[]; maxPlayers?: number }) => {
  const missingPlayers = maxPlayers - players.length;
  const status: Status = missingPlayers > 0 ? 'opened' : 'closed';

  if (status === 'closed') {
    // TODO: Add tooltip with all player names in the match
    return <Tag icon={<Done fontSize="large" color="primary" />} label={`Cerrado`} />;
  }

  return (
    <Tooltip title={<Span>{`Faltan ${missingPlayers} !!`}</Span>}>
      <Wrapper>
        <Text>{`Faltan`}</Text>
        <Badge value={<Span>{missingPlayers}</Span>} icon={<People fontSize="large" />} />
      </Wrapper>
    </Tooltip>
  );
};

export default MatchStatus;
