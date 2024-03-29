import useSWR from 'swr';
import styled from 'styled-components';
import { User } from '@/modules/users/model';
import { LineUp, LineUpPlayer } from '@/modules/lineups/model';
import Item from '@/modules/common/components/Item';
import MatchDate from '@/modules/common/components/Date';
import LineUpPlayers from '@/modules/lineups/components/LineUpPlayers';
import Actions from '@/modules/lineups/components/LineUpItem/Actions';
import api, { getUsers, joinLineUp } from '@/modules/common/services/api';
import PlayerSelector from '@/modules/users/components/PlayerSelector';
import { isAdmin } from '@/modules/users/utils';
import { sort } from '@/modules/common/utils';

const LineUpItem = ({ lineUp, user, onUpdate, onDelete }: Props) => {
  const { data } = useSWR(api.usersUrl, getUsers);
  const players = sort(data?.result || [], 'nickname');

  const addPlayer = async (player: User) => {
    const response = await joinLineUp(lineUp.id, player.nickname);
    onUpdate(response.result as LineUp);
  };

  const availablePlayers = players?.filter((player: User) => {
    return !lineUp.players.find((lineUpPlayer: LineUpPlayer) => lineUpPlayer.id === player.id);
  });

  return (
    <Item actions={<Actions lineUp={lineUp} user={user} onUpdate={onUpdate} />}>
      <Content>
        <MatchDate date={lineUp.date} format="EEEE dd/MM/yyyy - HH:mm'h'" />
        <Teams>{`${lineUp.homeTeam} - ${lineUp.awayTeam}`}</Teams>
        <Location>
          <Club>{`Club: `}</Club>
          {lineUp.clubName}
        </Location>
        {!!players.length && (
          <LineUpPlayers user={user as User} lineUp={lineUp} availablePlayers={players} onUpdate={onUpdate} />
        )}
        {isAdmin(user) && (
          <>
            <p>{`Añadir jugador`}</p>
            <PlayerSelector players={availablePlayers} onChange={addPlayer} />
          </>
        )}
      </Content>
    </Item>
  );
};

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  width: 100%;
`;

const Teams = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
  margin-top: 0;
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
