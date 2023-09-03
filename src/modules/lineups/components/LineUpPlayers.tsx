import styled from 'styled-components';
import { LineUpPlayer } from '@/modules/lineups/model';

const LineUpPlayers = ({ players }: Props) => {
  return (
    <>
      <Title>{`Apuntados`}</Title>
      <LineUpPlayersWrapper>
        {players.map((player: LineUpPlayer) => {
          return <LineUpPlayerItem key={player.id}>{player.nickname}</LineUpPlayerItem>;
        })}
      </LineUpPlayersWrapper>
    </>
  );
};

const Title = styled.p`
  font-weight: bold;
`;

const LineUpPlayersWrapper = styled.ol`
  margin: 0;
  padding-left: 1.5rem;
`;

const LineUpPlayerItem = styled.li`
  margin: 0.4rem 0;
`;

interface Props {
  players: LineUpPlayer[];
}

export default LineUpPlayers;
