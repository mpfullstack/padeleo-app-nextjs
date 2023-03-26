import { useState } from 'react';
import MatchPanel from '@/modules/matches/components/MatchPanel';
import MatchForm, { FormData } from '@/modules/matches/components/MatchForm/MatchForm';
import { Match } from '@/modules/matches/model';
import styled from 'styled-components';
import MatchPlayers from '@/modules/matches/components/MatchItem/MatchPlayers';
import Drawer from '@/modules/common/components/Drawer';
import { createMatch, updateMatch } from '@/modules/common/services/api';
import { Option } from '@/modules/common/components/Form/Select';
import CourtBooked from '@/modules/matches/components/MatchItem/CourtBooked';
import MatchTime from '@/modules/matches/components/MatchItem/MatchTime';
import MatchDate from '@/modules/matches/components/MatchItem/MatchDate';
import { LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import { useRouter } from 'next/router';

const MatchDetail = ({ match }: Props) => {
  const router = useRouter();
  const [matchData, setMatchData] = useState<Match>(match);
  const [editing, setEditing] = useState<Editing>({ status: 'idle', field: 'clubName', value: {}, options: [] });
  const { field, value, options } = editing;
  const isEditing = editing.status === 'editing';

  const saveMatch = async () => {
    try {
      if (matchData.id) {
        await updateMatch(matchData);
      } else {
        await createMatch(matchData);
      }
      router.push({ pathname: '/matches' });
    } catch (e: any) {
      // TODO: Handle error
    }
  };

  const startEditing = (field: keyof Match, value: FormData, options: Option[] = []) => {
    setEditing({
      status: 'editing',
      field,
      value,
      options,
    });
  };
  const stopEditing = () => setEditing({ status: 'idle', field: 'clubName', value: {}, options: [] });

  const editClub = () =>
    startEditing('clubName', {
      clubId: matchData.clubId,
      clubName: matchData.clubName,
      courtBooked: matchData.courtBooked,
    });

  const editStartime = () =>
    startEditing('startTime', { startTime: matchData.startTime, duration: matchData.duration });

  const editPlayers = () => startEditing('players', { players: matchData.players || [] });

  const updatedOrCreatedMatch = (data: Partial<Match>) => {
    setMatchData((state: Match) => ({
      ...state,
      ...data,
    }));
    stopEditing();
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
              <MatchDate date={matchData.startTime} />
              <MatchTime startTime={matchData.startTime} duration={matchData.duration} />
            </>
          ) : (
            <p>{`---`}</p>
          )}
        </MatchPanel>
        <MatchPanel title="Jugadores" onEdit={editPlayers} editLabel="Jugadores">
          <MatchPlayers matchId={matchData.id} players={matchData.players} max={4} />
        </MatchPanel>
        <LoadingButton onClick={() => saveMatch()}>{`Guardar`}</LoadingButton>
      </PanelWrapper>
      <Drawer anchor="bottom" open={isEditing} onClose={() => stopEditing()}>
        <MatchForm field={field} value={value} options={options} onFinish={data => updatedOrCreatedMatch(data)} />
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
