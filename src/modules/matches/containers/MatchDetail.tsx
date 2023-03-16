import { useState } from 'react';
import MatchPanel from '@/modules/matches/components/MatchPanel';
import { Match } from '@/modules/matches/model';
import { format } from '@/modules/common/services/dates';
import styled from 'styled-components';
import MatchPlayers from '../components/MatchItem/MatchPlayers';

const MatchDetail = ({ match }: Props) => {
  const [editing, editMatchField] = useState('');

  return (
    <>
      <PanelWrapper>
        <MatchPanel title="Club" onEdit={() => editMatchField('club')} editLabel="editClub">
          <p className="text">{match.clubName || '---'}</p>
        </MatchPanel>
        <MatchPanel title="Fecha y hora" onEdit={() => editMatchField('startTime')} editLabel="Fecha y hora">
          {match.startTime ? (
            <>
              <p className="text">{format(match.startTime, 'EEEE dd/MM/yyyy')}</p>
              <p className="text"></p>
            </>
          ) : (
            <p>{`---`}</p>
          )}
        </MatchPanel>
        <MatchPanel title="Jugadores" onEdit={() => editMatchField('players')} editLabel="Jugadores">
          <MatchPlayers matchId={match.id} players={match.players} max={4} />
        </MatchPanel>
      </PanelWrapper>
    </>
  );
};

const PanelWrapper = styled.div`
  width: 100%;
`;

interface Props {
  match: Match;
}

export default MatchDetail;
