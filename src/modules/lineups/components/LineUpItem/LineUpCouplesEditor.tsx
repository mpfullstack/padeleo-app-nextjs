import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import Select, { ItemText, Option } from '@/modules/common/components/Form/Select';
import styled from 'styled-components';
import Grid from '@/modules/common/components/Grid';
import { LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import { useLoading } from '@/modules/common/hooks/useLoading';
import { LineUp, LineUpCouple, LineUpPlayer } from '@/modules/lineups/model';
import api, { getLineUpCouples, updateLineUpCouples } from '@/modules/common/services/api';
import TextField from '@/modules/common/components/Form/TextField';
import {
  sortCouples,
  getCurrentPlayerCoupleIndex,
  isPlayerIdInLineUpCouples,
  updatePlayerPosition,
  updatePlayerScore,
} from '@/modules/lineups/utils';

const LineUpCouplesEditor = ({ lineUp }: Props) => {
  const { data, mutate } = useSWR([api.lineUpsUrl, lineUp.id], getLineUpCouples);
  const lineUpCouplesResult = data?.result;
  const [lineUpCouplesState, setLineUpState] = useState<LineUpCouple[]>([]);
  const [saveStatus, _] = useLoading();

  useEffect(() => lineUpCouplesResult && setLineUpState(lineUpCouplesResult), [lineUpCouplesResult]);

  // const onLineUpCouplesUpdated = useCallback(
  //   (updatedLineUp: LineUp) => {
  //     mutate(
  //       async currentData => {
  //         return {
  //           ...currentData,
  //           result: updateLineUp(currentData?.result as LineUp[], updatedLineUp),
  //         } as ResponseLineUpData;
  //       },
  //       { revalidate: false }
  //     );
  //   },
  //   [mutate]
  // );

  const onSave = async () => {
    await updateLineUpCouples(lineUp.id, lineUpCouplesState);
    debugger;
  };

  const totalCouples = Math.floor(lineUp.convokedPlayers.length / 2);
  const missingCouplesLength = lineUpCouplesResult ? totalCouples - lineUpCouplesState.length : 0;
  let missingCouples: LineUpCouple[] = Array.from({ length: missingCouplesLength }, () => ({
    id: '',
    playerIdA: '',
    playerIdB: '',
    playerScoreA: 0,
    playerScoreB: 0,
    lineUpId: lineUp.id,
  }));
  const lineUpCouples = sortCouples(lineUpCouplesState).concat(missingCouples);

  const handlePlayerPositionChange = (playerId: string, i: number, position: string) => {
    const currentPlayerCoupleIndex = getCurrentPlayerCoupleIndex(lineUpCouples, playerId);
    lineUpCouples[i] = updatePlayerPosition(lineUpCouples[i], position, playerId);
    const isSelectedPlayerInAnotherCouple = currentPlayerCoupleIndex > -1 && currentPlayerCoupleIndex !== i;
    if (isSelectedPlayerInAnotherCouple) {
      lineUpCouples[currentPlayerCoupleIndex] = updatePlayerPosition(
        lineUpCouples[currentPlayerCoupleIndex],
        position,
        ''
      );
    }
    setLineUpState([...lineUpCouples]);
  };

  const handlePlayerScoreChange = (score: string, i: number, position: string) => {
    const couple = lineUpCouples[i];
    lineUpCouples[i] = updatePlayerScore(couple, position, parseInt(score, 10));
    setLineUpState([...lineUpCouples]);
  };

  return (
    <LineUpCouplesEditorWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12} />
      </Grid>
      <Grid container spacing={0}>
        {lineUpCouples.map((couple: LineUpCouple, i: number) => {
          const position = i + 1;
          return (
            <Grid container key={`${couple.playerIdA}-${couple.playerIdB}-${i}`}>
              <Grid item xs={2}>
                <Info>
                  <InfoItem>
                    <strong>{`P${position}`}</strong>
                  </InfoItem>
                  <InfoItem>{`Ptos. ${couple.playerScoreA + couple.playerScoreB}`}</InfoItem>
                </Info>
              </Grid>
              <Grid item xs={5}>
                <PlayerSelector
                  playerId={couple.playerIdA}
                  playerScore={String(couple.playerScoreA)}
                  players={lineUp.convokedPlayers}
                  lineUpCouples={lineUpCouples}
                  onChangePlayer={(value: string) => handlePlayerPositionChange(value, i, 'A')}
                  onChangeScore={(value: string) => handlePlayerScoreChange(value, i, 'A')}
                />
              </Grid>
              <Grid item xs={5}>
                <PlayerSelector
                  playerId={couple.playerIdB}
                  playerScore={String(couple.playerScoreB)}
                  players={lineUp.convokedPlayers}
                  lineUpCouples={lineUpCouples}
                  onChangePlayer={(value: string) => handlePlayerPositionChange(value, i, 'B')}
                  onChangeScore={(value: string) => handlePlayerScoreChange(value, i, 'B')}
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Grid container className="actions">
        <Grid item>
          <LoadingButton loading={saveStatus === 'loading'} onClick={onSave}>{`Guardar`}</LoadingButton>
        </Grid>
      </Grid>
    </LineUpCouplesEditorWrapper>
  );
};

const PlayerSelector = ({
  playerId,
  playerScore,
  players,
  lineUpCouples,
  onChangePlayer,
  onChangeScore,
}: PlayerSelectorProps) => {
  const playerOptions = players.map(
    (player: LineUpPlayer): Option => ({
      id: player.id as string,
      value: player.nickname,
      contentValue: isPlayerIdInLineUpCouples(lineUpCouples, player.id) ? (
        <strong>{player.nickname}</strong>
      ) : (
        player.nickname
      ),
    })
  );

  return (
    <Info>
      <Select
        className="player-selector"
        value={playerId}
        options={playerOptions}
        onChange={(playerId: string) => onChangePlayer(playerId)}
      />
      <TextField
        id={playerId}
        label="Puntos"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeScore(e.target.value)}
        defaultValue={playerScore}
      />
    </Info>
  );
};

interface PlayerSelectorProps {
  playerId: string;
  playerScore: string;
  players: LineUpPlayer[];
  lineUpCouples: LineUpCouple[];
  onChangePlayer: (value: string) => void;
  onChangeScore: (value: string) => void;
}

const LineUpCouplesEditorWrapper = styled.div`
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  ${ItemText} {
    font-weight: bold;
  }
`;

const InfoItem = styled.span`
  font-size: 1.4rem;
`;

interface Props {
  lineUp: LineUp;
}

export default LineUpCouplesEditor;
