import styled from 'styled-components';
import { Row, Col } from '@/modules/common/components/Layout';
import { User } from '@/modules/users/model';
import Select from '@/modules/common/components/Form/Select';

const PlayerSelector = ({ players, onChange }: Props) => {
  const options = players.map((player: User) => ({
    id: player.id as string,
    value: player.nickname as string,
  }));

  const handlePlayerChange = (value: string) => {
    const selectedPlayer = players.find((player: User) => player.id === value);
    onChange(selectedPlayer as User);
  };

  return (
    <StyledRow>
      <Col xs={8}>
        <Select label="Jugador" options={options} onChange={(value: string) => handlePlayerChange(value)} />
      </Col>
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  margin: 2rem 0;
`;

interface Props {
  players: User[];
  onChange: (user: User) => void;
}

export default PlayerSelector;
