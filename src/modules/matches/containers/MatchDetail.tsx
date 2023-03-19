import { useState } from 'react';
import useSWR from 'swr';
import MatchPanel from '@/modules/matches/components/MatchPanel';
import MatchForm, { FormData } from '@/modules/matches/components/MatchForm/MatchForm';
import { Match } from '@/modules/matches/model';
import { format } from '@/modules/common/services/dates';
import styled from 'styled-components';
import MatchPlayers from '@/modules/matches/components/MatchItem/MatchPlayers';
import Drawer from '@/modules/common/components/Drawer';
import api, { getClubs, getUsers } from '@/modules/common/services/api';
import { Club } from '@/modules/clubs/model';
import { User } from '@/modules/users/model';
import { Option } from '@/modules/common/components/Form/Select';
import CourtBooked from '@/modules/matches/components/MatchItem/CourtBooked';

const MatchDetail = ({ match }: Props) => {
  const [matchData, setMatchData] = useState<Match>(match);
  const [editing, setEditing] = useState<Editing>({ status: 'idle', field: 'clubName', value: {}, options: [] });
  const { data: players } = useSWR(api.usersUrl, getUsers);
  const { data: clubs } = useSWR(api.clubsUrl, getClubs);
  const { field, value, options } = editing;
  const isEditing = editing.status === 'editing';

  const startEditing = (field: keyof Match, value: FormData, options: Option[] = []) => {
    setEditing({
      status: 'editing',
      field,
      value,
      options,
    });
  };
  const stopEditing = () => setEditing({ status: 'idle', field: 'clubName', value: {}, options: [] });

  const mapClubsToOptions = (clubs: Club[]): Option[] =>
    clubs.map((club: Club) => ({
      id: club.id as string,
      value: club.name,
    }));
  const mapPlayersToOptions = (players: User[]): Option[] =>
    players.map((player: User) => ({
      id: player.id as string,
      value: player.nickname as string,
    }));

  const editClub = () =>
    startEditing(
      'clubName',
      {
        clubId: matchData.clubId,
        clubName: matchData.clubName,
        courtBooked: matchData.courtBooked,
      },
      mapClubsToOptions(clubs?.result || [])
    );

  const editStartime = () => startEditing('startTime', { startTime: matchData.startTime });

  const editPlayers = () =>
    startEditing('players', { players: matchData.players }, mapPlayersToOptions(players?.result || []));

  const updatedOrCreatedMatch = (data: Partial<Match>) => {
    setMatchData((state: Match) => ({
      ...state,
      ...data,
    }));
  };

  return (
    <>
      <PanelWrapper>
        <MatchPanel title="Club" onEdit={editClub} editLabel="Editar club">
          <>
            <p className="text">{matchData.clubName || '---'}</p>
            {matchData.clubName && <CourtBooked booked={matchData.courtBooked} />}
          </>
        </MatchPanel>
        <MatchPanel title="Fecha y hora" onEdit={editStartime} editLabel="Fecha y hora">
          {matchData.startTime ? (
            <>
              <p className="text">{format(matchData.startTime, 'EEEE dd/MM/yyyy')}</p>
              <p className="text"></p>
            </>
          ) : (
            <p>{`---`}</p>
          )}
        </MatchPanel>
        <MatchPanel title="Jugadores" onEdit={editPlayers} editLabel="Jugadores">
          <MatchPlayers matchId={matchData.id} players={matchData.players} max={4} />
        </MatchPanel>
      </PanelWrapper>
      <Drawer anchor="bottom" open={isEditing} onClose={() => stopEditing()}>
        <div
          style={{
            maxWidth: '520px',
            width: '96%',
            minHeight: '30rem',
            margin: '0 auto',
          }}
        >
          <MatchForm field={field} value={value} options={options} onFinish={data => updatedOrCreatedMatch(data)} />
        </div>
      </Drawer>
    </>
  );
};

const PanelWrapper = styled.div`
  width: 100%;
`;

interface Props {
  match: Match;
}

interface Editing {
  status: 'idle' | 'editing';
  field: keyof Match;
  value: FormData;
  options: Option[];
}

export default MatchDetail;
