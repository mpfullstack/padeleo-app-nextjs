import styled from 'styled-components';
import { User } from '@/modules/users/model';
import { LineUp } from '@/modules/lineups/model';
import Item, { ItemWrapper } from '@/modules/common/components/Item';
import theme from '@/theme/theme';
import LineUpPlayerActions from './Actions';
import Tag from '@/modules/common/components/Tag';
import { isUserConvoked } from '../../model/utils';

const LineUpPlayerItem = ({ user, lineUp, position, player, onUpdate }: Props) => {
  return (
    <PlayerItemWrapper>
      <Item actions={<LineUpPlayerActions user={user} lineUp={lineUp} player={player} onUpdate={onUpdate} />}>
        <Content>
          <Details>
            <Text>
              <Position>{position}</Position>
              <PlayerName>{player.nickname}</PlayerName>
            </Text>
            <Text>{`Conv. apuntadas: ${player.lineUpsJoinedCount}`}</Text>
            <Text>{`Conv. jugadas: ${player.lineUpsConvokedCount}`}</Text>
          </Details>
          <Status>
            {isUserConvoked(lineUp, player as User) ? (
              <Tag label={`Convocado`} color={theme.palette.success.main} />
            ) : (
              <Tag label={`Sin convocar`} color={theme.palette.warning.main} />
            )}
          </Status>
        </Content>
      </Item>
    </PlayerItemWrapper>
  );
};

const PlayerItemWrapper = styled.div`
  margin: 0.4rem 0;
  ${ItemWrapper} {
    width: 100%;
    margin: 0;
    padding: 0 0 1rem 0;
    box-shadow: none;
    border-bottom: 1px solid ${theme.palette.grey[300]};
    border-radius: none;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

const Position = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  &:after {
    content: ' - ';
  }
  margin-right: 0.3rem;
`;

const Status = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  margin-left: auto;
`;

const PlayerName = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  margin: 0;
`;

interface Props {
  user: User;
  lineUp: LineUp;
  position: number;
  player: User;
  onUpdate: (lineUp: LineUp) => void;
}

export default LineUpPlayerItem;
