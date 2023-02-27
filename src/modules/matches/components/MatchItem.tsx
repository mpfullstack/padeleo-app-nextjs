import styled from 'styled-components';
import { Match } from '@/modules/matches/model/index';
import { format, addSeconds } from '@/modules/common/services/dates';
import { User } from '@/modules/users/model';

const MatchItem = ({ match }: Props) => {
  return (
    <MatchItemWrapper key={`match-${match.id}`}>
      <Content>
        <p>{match.clubName || <span>{`No definido`}</span>}</p>
        <MatchDate>{match.startTime ? format(match.startTime, 'EEEE dd/MM/yyyy') : `Fecha sin definir`}</MatchDate>
        <MatchTime startTime={match.startTime} duration={match.duration} />
      </Content>
      <SideContent>
        <MatchStatusView players={match.players} />
      </SideContent>
    </MatchItemWrapper>
  );
};

const MatchItemWrapper = styled.div`
  width: 100%;
  padding: 0.8rem 1.2rem;
  margin-bottom: 2rem;
  text-transform: inherit;
  -webkit-box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
`;

const SideContent = styled(Content)`
  margin-left: auto;
  align-self: flex-start;
`;

const MatchDate = styled.p`
  text-transform: capitalize;
`;

const MatchTime = ({ startTime, duration }: { startTime: string; duration: number }) => {
  return (
    <p>
      {`De `}
      {format(startTime, 'H:mm')}
      {` a `}
      {format(addSeconds(new Date(startTime), duration).toString(), 'H:mm')}
    </p>
  );
};

type MatchStatus = 'opened' | 'closed';

const MatchStatusView = ({ players = [], maxPlayers = 4 }: { players: User[]; maxPlayers?: number }) => {
  const missingPlayers = maxPlayers - players.length;
  const status: MatchStatus = missingPlayers > 0 ? 'opened' : 'closed';

  if (status === 'closed') {
    return <p>{`Cerrado`}</p>;
  }

  return (
    <p>
      {`Faltan `}
      <strong>{missingPlayers}</strong>
      {` !!`}
    </p>
  );
};

interface Props {
  match: Match;
}

export default MatchItem;
