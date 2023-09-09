import styled from 'styled-components';
import { LineUpPlayer } from '@/modules/lineups/model';

const LineUpPlayers = ({ players, totalPlayersAvailable }: Props) => {
  return (
    <Wrapper>
      <Title>
        {`Apuntados`}
        <Span>{` (${players.length} de ${totalPlayersAvailable})`}</Span>
      </Title>
      <LineUpPlayersWrapper>
        {players.map((player: LineUpPlayer) => {
          return <LineUpPlayerItem key={player.id}>{player.nickname}</LineUpPlayerItem>;
        })}
      </LineUpPlayersWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.p`
  font-weight: bold;
`;

const Span = styled.span`
  font-weight: normal;
`;

const LineUpPlayersWrapper = styled.ol`
  margin: 0;
  padding-left: 2.5rem;
`;

const LineUpPlayerItem = styled.li`
  margin: 0.4rem 0;
`;

interface Props {
  players: LineUpPlayer[];
  totalPlayersAvailable: number;
}

export default LineUpPlayers;
