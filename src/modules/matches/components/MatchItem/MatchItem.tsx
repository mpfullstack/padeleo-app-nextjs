import styled from 'styled-components';
import { Match } from '@/modules/matches/model/index';
import { Paragraph } from './styles';
import MatchStatus from './MatchStatus';
import MatchTime from './MatchTime';
import CourtBooked from './CourtBooked';
import Actions from './Actions';
import MatchResult from './MatchResult/MatchResult';
import { User } from '@/modules/users/model';
import MatchDate from './MatchDate';
import { hasResults } from '@/modules/matches/utils';

const MatchItem = ({ match, user, onUpdate, onDelete }: Props) => {
  return (
    <MatchItemWrapper>
      <MainContent>
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
      </MainContent>
      <Actions match={match} user={user} onUpdate={onUpdate} onDelete={onDelete} />
    </MatchItemWrapper>
  );
};

const MatchItemWrapper = styled.div`
  width: 100%;
  padding: 1.2rem 1.2rem;
  margin-bottom: 2rem;
  text-transform: inherit;
  -webkit-box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  border-radius: 4px;
`;

const MainContent = styled.div`
  display: flex;
`;

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
