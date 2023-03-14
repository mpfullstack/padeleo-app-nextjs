import Select, { Option } from '@/modules/common/components/Form/Select';
import { Match } from '@/modules/matches/model';
import { Result, Side } from '@/modules/results/model';
import { User } from '@/modules/users/model';
import styled from 'styled-components';
import Grid from '@/modules/common/components/Grid';
import { useState } from 'react';
import MatchResultEditor from './MatchResultEditor';
import { LoadingButton } from '@/modules/common/components/Buttons';
import { useLoading } from '@/modules/common/hooks/useLoading';
import { updateMatch, updateResults } from '@/modules/common/services/api';

const MatchResultsEditor = ({ match, onUpdate }: Props) => {
  const { players, results } = match;
  const [saveStatus, setSaveStatus] = useLoading();
  const [resultState, setResultState] = useState<ResultState>({ players, results });
  const playerOptions = resultState.players.map(
    (player: User): Option => ({
      id: player.id as string,
      value: player.nickname as string,
    })
  );

  const handlePlayerPositionChange = (playerId: string, currentPosition: number) => {
    setResultState((currentState: ResultState) => {
      const players = currentState.players;
      const newPosition = players.findIndex((player: User) => player.id === playerId);
      const playerInNewPosition = players[newPosition];
      const playerInCurrentPosition = players[currentPosition];
      players[newPosition] = { ...playerInCurrentPosition };
      players[currentPosition] = { ...playerInNewPosition };
      return {
        ...currentState,
        players: [...players],
      };
    });
  };

  const onChangeResult = (value: string, set: number, side: Side) => {
    setResultState((currentState: ResultState) => {
      const results = currentState.results;
      const setResult = results[set] || {
        type: 'set',
        matchId: match.id,
        home: 0,
        away: 0,
      };
      results[set] = {
        ...setResult,
        [side]: Number(value),
      };
      return {
        ...currentState,
        results: [...results],
      };
    });
  };

  const onSave = async () => {
    try {
      setSaveStatus('loading');
      const matchToUpdate = {
        ...match,
        players: resultState.players,
      };
      const [matchResponse, resultsResponse] = await Promise.all([
        updateMatch(matchToUpdate),
        updateResults(resultState.results),
      ]);
      const updatedMatch = matchResponse.result as Match;
      const updatedResults = resultsResponse.result as Result[];
      setResultState((currentState: ResultState) => ({ ...currentState, results: updatedResults }));
      onUpdate({
        ...updatedMatch,
        results: updatedResults,
      });
      setSaveStatus('success');
    } catch (e: any) {
      // TODO: Handle ApiError, show Toast message
      // e.status
      // e.data.message
      setSaveStatus('error');
    }
  };

  return (
    <MatchResultsEditorWrapper>
      <Grid container spacing={0}>
        <Grid item xs={5} />
        <Grid item xs={7}>
          <Grid container className="header">
            <Grid item xs={4}>{`1 set`}</Grid>
            <Grid item xs={4}>{`2 set`}</Grid>
            <Grid item xs={4}>{`3 set`}</Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          {resultState.players.slice(0, 2).map((player: User, i: number) => (
            <Select
              className="player-selector"
              key={`select-${player.id}-${i}`}
              value={player.id as string}
              options={playerOptions}
              onChange={(value: string) => handlePlayerPositionChange(value, i)}
            />
          ))}
        </Grid>
        <Grid item xs={7} className="results-editor">
          <Grid container>
            <MatchResultEditor
              results={resultState.results}
              side="home"
              onChange={(value, set) => onChangeResult(value, set, 'home')}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          {resultState.players.slice(2).map((player: User, i: number) => (
            <Select
              className="player-selector"
              key={`select-${player.id}-${i}`}
              value={player.id as string}
              options={playerOptions}
              onChange={(value: string) => handlePlayerPositionChange(value, 2 + i)}
            />
          ))}
        </Grid>
        <Grid item xs={7} className="results-editor">
          <Grid container>
            <MatchResultEditor
              results={resultState.results}
              side="away"
              onChange={(value, set) => onChangeResult(value, set, 'away')}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="actions">
        <Grid item>
          <LoadingButton loading={saveStatus === 'loading'} onClick={onSave}>{`Guardar`}</LoadingButton>
        </Grid>
      </Grid>
    </MatchResultsEditorWrapper>
  );
};

const MatchResultsEditorWrapper = styled.div`
  padding: 1rem;
  min-height: 30rem;
  .MuiGrid-item {
    padding: 0.5rem;
  }
  .header {
    text-align: center;
    font-weight: 600;
  }
  .player-selector {
    margin: 0.4rem 0;
  }
  .results-editor {
    display: flex;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
`;

interface ResultState {
  players: User[];
  results: Result[];
}

interface Props {
  match: Match;
  onUpdate: (match: Match) => void;
}

export default MatchResultsEditor;
