import styled from 'styled-components';
import { Span } from './styles';
import { User } from '@/modules/users/model';
import QuestionMark from '@/modules/common/icons/QuestionMark';

const MatchPlayers = ({ matchId, players = [], max, display = 'row' }: Props) => {
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
        return <Couple key={`${i}-${matchId}-couple`} couple={couple} display={display} />;
      })}
    </PlayersWrapper>
  );
};

export const Couple = ({ couple, display }: { couple: User[]; display: Display }) => {
  const [playerA, playerB] = [...couple];
  return (
    <PlayersCouple display={display}>
      <Player>
        <PlayerName>{playerA?.nickname || <QuestionMark />}</PlayerName>
      </Player>
      {display === 'row' && <Divider>{`-`}</Divider>}
      <Player>
        <PlayerName>{playerB?.nickname || <QuestionMark />}</PlayerName>
      </Player>
    </PlayersCouple>
  );
};

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  align-self: stretch;
  align-items: center;
  min-width: 12rem;
`;

const PlayersCouple = styled.div<{ display: Display }>`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: ${({ display }) => (display === 'row' ? 'center' : 'flex-end')};
  margin: 0.2rem 0;
  flex-direction: ${({ display }) => display};
`;

const Player = styled.p`
  font-weight: 500;
  margin: 0.2rem;
`;

const PlayerName = styled(Span)`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Divider = styled(Span)`
  margin: 0 1rem;
`;

interface Props {
  matchId: string;
  players: User[];
  max: number;
  display?: Display;
}

type Display = 'column' | 'row';

export default MatchPlayers;
