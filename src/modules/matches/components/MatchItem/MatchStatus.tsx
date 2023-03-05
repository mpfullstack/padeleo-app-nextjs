import styled from 'styled-components';
import People from '@/modules/common/icons/People';
import Badge from '@/modules/common/components/Badge';
import Tooltip from '@/modules/common/components/Tooltip';
import { Text, Span } from './styles';
import Done from '@/modules/common/icons/Done';
import Tag from '@/modules/common/components/Tag';
import { getMatchStatus, getMissingPlayers } from '@/modules/matches/model/utils';
import { Match } from '@/modules/matches/model';
import { User } from '@/modules/users/model';
import QuestionMark from '@/modules/common/icons/QuestionMark';

const MatchStatus = ({ match }: Props) => {
  const missingPlayers = getMissingPlayers(match);
  const status = getMatchStatus(match);

  if (status === 'closed') {
    return (
      <>
        <TagWrapper>
          <Tag icon={<Done fontSize="large" color="primary" />} label={`Cerrado`} />
        </TagWrapper>
        <Players players={match.players} matchId={match.id} max={match.maxPlayers} />
      </>
    );
  }

  return (
    <Tooltip title={<Span>{`Faltan ${missingPlayers} !!`}</Span>}>
      <>
        <Wrapper>
          <Text>{`Faltan`}</Text>
          <Badge value={<Span>{missingPlayers}</Span>} icon={<People fontSize="large" />} />
        </Wrapper>
        <Players players={match.players} matchId={match.id} max={match.maxPlayers} />
      </>
    </Tooltip>
  );
};

const Players = ({ matchId, players = [], max }: { matchId: string; players: User[]; max: number }) => {
  const allPlayerSpots = Array.from({ length: max }, () => undefined);
  const playerCouples: User[][] = allPlayerSpots.reduce((accum: User[][], player: undefined, i: number) => {
    if (i % 2 === 0) {
      const couple = [players[i] || player, players[i + 1] || player];
      accum.push(couple);
    }
    return accum;
  }, []);

  return (
    <PlayersWrapper>
      {playerCouples.map((couple: User[], i: number) => {
        const [playerA, playerB] = [...couple];
        debugger;
        return (
          <PlayersCouple key={`${i}-${matchId}-couple`}>
            <Player>
              <PlayerName>{playerA?.firstname || <QuestionMark />}</PlayerName>
            </Player>
            <Divider>{`-`}</Divider>
            <Player>
              <PlayerName>{playerB?.firstname || <QuestionMark />}</PlayerName>
            </Player>
          </PlayersCouple>
        );
      })}
    </PlayersWrapper>
  );
};

const Wrapper = styled.span`
  margin: 1.2rem 0.7rem 0 0;
  display: flex;
  align-items: center;
`;

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  align-self: stretch;
  align-items: center;
`;

const PlayersCouple = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  margin: 0.2rem 0;
`;

const Player = styled.p`
  font-weight: 500;
`;

const PlayerName = styled(Span)`
  font-size: 1.5rem;
`;

const Divider = styled(Span)`
  margin: 0 1rem;
`;

const TagWrapper = styled.div`
  margin-top: 0.3rem;
`;

interface Props {
  match: Match;
}

export default MatchStatus;
