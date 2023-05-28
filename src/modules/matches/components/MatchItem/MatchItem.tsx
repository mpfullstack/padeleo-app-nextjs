import styled from 'styled-components';
import { Match } from '@/modules/matches/model/index';
import { Paragraph } from './styles';
import MatchStatus from './MatchStatus';
import MatchTime from './MatchTime';
import CourtBooked from './CourtBooked';
import Actions from './Actions';
import MatchResult from './MatchResult/MatchResult';
import { User } from '@/modules/users/model';
import { hasResults } from '@/modules/matches/utils';
import Item from '@/modules/common/components/Item';
import MatchDate from '@/modules/common/components/Date';

const MatchItem = ({ match, user, onUpdate, onDelete }: Props) => {
  return (
    <Item actions={<Actions match={match} user={user} onUpdate={onUpdate} onDelete={onDelete} />}>
      <>
        <Content>
          <ClubName>{match.clubName || `Sin definir`}</ClubName>
          <CourtBooked booked={match.courtBooked} />
          {match.startTime ? <MatchDate date={match.startTime} /> : <Paragraph>{`Fecha sin definir`}</Paragraph>}
          <MatchTime startTime={match.startTime} duration={match.duration} />
        </Content>
        <SideContent>
          {hasResults(match) ? (
            <MatchResult
              results={match.results}
              players={match.players}
              matchId={match.id}
              maxPlayers={match.maxPlayers}
            />
          ) : (
            <MatchStatus match={match} />
          )}
        </SideContent>
      </>
    </Item>
  );
};

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
`;

const ClubName = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0;
`;

const SideContent = styled(Content)`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;
`;

interface Props {
  match: Match;
  onUpdate: (match: Match) => void;
  onDelete: (matchId: string) => void;
  user?: User;
}

export default MatchItem;
