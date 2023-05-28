import styled from 'styled-components';
import { LineUpPlayer } from '@/modules/lineups/model';

const LineUpPlayers = ({ players }: Props) => {
  return (
    <LineUpPlayersWrapper>
      <p>
        <strong>{`Apuntados`}</strong>
      </p>
      {players.map((player: LineUpPlayer) => {
        return <LineUpPlayerItem key={player.id}>{player.nickname}</LineUpPlayerItem>;
      })}
    </LineUpPlayersWrapper>
  );
};

const LineUpPlayersWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const LineUpPlayerItem = styled.li`
  margin: 0;
  padding: 0;
  &:before {
    content: '-';
    margin-right: 0.3rem;
  }
`;

interface Props {
  players: LineUpPlayer[];
}

export default LineUpPlayers;
