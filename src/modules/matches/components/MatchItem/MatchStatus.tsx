import styled from 'styled-components';
import People from '@/modules/common/icons/People';
import Badge from '@/modules/common/components/Badge';
import Tooltip from '@/modules/common/components/Tooltip';
import { Span } from './styles';
import { Text } from '@/modules/common/components/styles';
import Done from '@/modules/common/icons/Done';
import Tag from '@/modules/common/components/Tag';
import { getMatchStatus, getMissingPlayers } from '@/modules/matches/model/utils';
import { Match } from '@/modules/matches/model';
import MatchPlayers from './MatchPlayers';

const MatchStatus = ({ match }: Props) => {
  const missingPlayers = getMissingPlayers(match);
  const status = getMatchStatus(match);

  if (status === 'closed') {
    return (
      <>
        <TagWrapper>
          <Tag icon={<Done fontSize="medium" color="primary" />} label={`Cerrado`} />
        </TagWrapper>
        <MatchPlayers players={match.players} matchId={match.id} max={match.maxPlayers} />
      </>
    );
  }

  return (
    <Tooltip title={<Span>{`Faltan ${missingPlayers} !!`}</Span>}>
      <>
        <Wrapper>
          <Text>{`Faltan`}</Text>
          <Badge value={<Span>{missingPlayers}</Span>} icon={<People fontSize="medium" />} />
        </Wrapper>
        <MatchPlayers players={match.players} matchId={match.id} max={match.maxPlayers} />
      </>
    </Tooltip>
  );
};

const Wrapper = styled.span`
  margin: 0.2rem 0.7rem 0 0;
  display: flex;
  align-items: center;
  min-height: 3rem;
`;

const TagWrapper = styled.div`
  margin-top: 0.3rem;
  min-height: 3rem;
`;

interface Props {
  match: Match;
}

export default MatchStatus;
