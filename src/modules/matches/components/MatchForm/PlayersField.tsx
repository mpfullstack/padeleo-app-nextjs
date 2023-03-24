import styled from 'styled-components';
import { Row, Col } from '@/modules/common/components/Layout';
import { User } from '@/modules/users/model';
import Select from '@/modules/common/components/Form/Select';
import api, { getUsers } from '@/modules/common/services/api';
import useSWR from 'swr';

const PlayersField = ({ value: fieldValue, onChange }: Props) => {
  const selectedPlayers = Array.from({ length: 4 }, (_, i) => fieldValue.players[i] || { id: '', value: '' });
  const { data } = useSWR(api.usersUrl, getUsers);

  if (!data?.result) {
    return null;
  }

  const availablePlayers = data.result;
  const options = availablePlayers.map((player: User) => ({
    id: player.id as string,
    value: player.nickname as string,
  }));

  const handlePlayerChange = (value: string, position: number) => {
    const selectedPlayer = availablePlayers.find((available: User) => available.id === value);
    const newPlayers: User[] = selectedPlayers.map((player: User, i: number) => {
      if (player.id === value && i !== position) {
        return { id: '', firstname: '', lastname: '', nickname: '', email: '' };
      }
      if (i === position) {
        return selectedPlayer as User;
      }
      return player;
    });

    onChange({
      players: newPlayers,
    });
  };

  const [firstPlayer, secondPlayer, thirdPlayer, fourthPlayer] = [...selectedPlayers];

  return (
    <>
      <StyledRow>
        <Col xs={6}>
          <Select
            label="Jugador 1"
            value={firstPlayer.id}
            options={options}
            onChange={(value: string) => handlePlayerChange(value, 0)}
          />
        </Col>
        <Col xs={6}>
          <Select
            label="Jugador 2"
            value={secondPlayer.id}
            options={options}
            onChange={(value: string) => handlePlayerChange(value, 1)}
          />
        </Col>
      </StyledRow>
      <StyledRow>
        <Col xs={6}>
          <Select
            label="Jugador 3"
            value={thirdPlayer.id}
            options={options}
            onChange={(value: string) => handlePlayerChange(value, 2)}
          />
        </Col>
        <Col xs={6}>
          <Select
            label="Jugador 4"
            value={fourthPlayer.id}
            options={options}
            onChange={(value: string) => handlePlayerChange(value, 3)}
          />
        </Col>
      </StyledRow>
    </>
  );
};

const StyledRow = styled(Row)`
  margin: 1rem;
`;

export interface PlayersValue {
  players: User[];
}

interface Props {
  value: PlayersValue;
  onChange: (value: PlayersValue) => void;
}

export default PlayersField;
