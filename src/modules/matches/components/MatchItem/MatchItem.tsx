import { Match } from '@/modules/matches/model/index';
import { format } from '@/modules/common/services/dates';
import { MatchItemWrapper, Content, ClubName, SideContent, Paragraph } from './styles';
import MatchStatus from './MatchStatus';
import MatchTime from './MatchTime';

const MatchItem = ({ match }: Props) => {
  return (
    <MatchItemWrapper>
      <Content>
        <ClubName>{match.clubName || `Sin definir`}</ClubName>
        <Paragraph>{match.startTime ? format(match.startTime, 'EEEE dd/MM/yyyy') : `Fecha sin definir`}</Paragraph>
        <MatchTime startTime={match.startTime} duration={match.duration} />
      </Content>
      <SideContent>
        <MatchStatus players={match.players} />
      </SideContent>
    </MatchItemWrapper>
  );
};

interface Props {
  match: Match;
}

export default MatchItem;
