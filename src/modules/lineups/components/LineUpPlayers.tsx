import styled from 'styled-components';
import { LineUp, LineUpPlayer } from '@/modules/lineups/model';
import LineUpPlayerItem from './LineUpPlayerItem';
import { User } from '@/modules/users/model';

const LineUpPlayers = ({ user, lineUp, availablePlayers, onUpdate }: Props) => {
  return (
    <Wrapper>
      <Title>
        {`Apuntados`}
        <Span>{` (${lineUp.players.length} de ${availablePlayers.length})`}</Span>
      </Title>
      <Title>
        {`Convocados`}
        <Span>{` (${lineUp.convokedPlayers.length} de ${lineUp.players.length})`}</Span>
      </Title>
      <LineUpPlayersWrapper>
        {lineUp.players.map((player: LineUpPlayer, i: number) => {
          return (
            <LineUpPlayerItem
              user={user}
              lineUp={lineUp}
              key={player.id}
              position={i + 1}
              player={availablePlayers.find((availablePlayer: User) => availablePlayer.id === player.id) as User}
              onUpdate={onUpdate}
            />
          );
        })}
      </LineUpPlayersWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const Title = styled.p`
  font-weight: bold;
`;

const Span = styled.span`
  font-weight: normal;
`;

const LineUpPlayersWrapper = styled.div`
  margin-top: 2rem;
`;

interface Props {
  user: User;
  lineUp: LineUp;
  availablePlayers: User[];
  onUpdate: (lineUp: LineUp) => void;
}

export default LineUpPlayers;
