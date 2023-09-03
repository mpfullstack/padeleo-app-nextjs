import styled from 'styled-components';
import { User } from '@/modules/users/model';
import { LineUp } from '@/modules/lineups/model';
import Item from '@/modules/common/components/Item';
import MatchDate from '@/modules/common/components/Date';
import LineUpPlayers from '@/modules/lineups/components/LineUpPlayers';
import Actions from '@/modules/lineups/components/LineUpItem/Actions';

const LineUpItem = ({ lineUp, user, onUpdate, onDelete }: Props) => {
  return (
    <Item actions={<Actions lineUp={lineUp} user={user} onUpdate={onUpdate} />}>
      <>
        <Content>
          <Teams>{`${lineUp.homeTeam} - ${lineUp.awayTeam}`}</Teams>
          <Location>
            <Club>{`Club: `}</Club>
            {lineUp.clubName}
          </Location>
          <MatchDate date={lineUp.date} format="EEEE dd/MM/yyyy - HH:mm'h'" />
          <LineUpPlayers players={lineUp.players} />
        </Content>
      </>
    </Item>
  );
};

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
`;

const Teams = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0;
`;

const Location = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

const Club = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
`;

interface Props {
  lineUp: LineUp;
  onUpdate: (lineUp: LineUp) => void;
  onDelete: (lineUpId: string) => void;
  user?: User;
}

export default LineUpItem;
