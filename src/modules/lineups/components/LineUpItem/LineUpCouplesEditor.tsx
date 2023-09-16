import useSWR from 'swr';
import Select, { Option } from '@/modules/common/components/Form/Select';
import { Match } from '@/modules/matches/model';
import styled from 'styled-components';
import Grid from '@/modules/common/components/Grid';
import { LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import { useLoading } from '@/modules/common/hooks/useLoading';
import { LineUp, LineUpCouple, LineUpPlayer } from '@/modules/lineups/model';
import api, { getLineUpCouples } from '@/modules/common/services/api';
import TextField from '@/modules/common/components/Form/TextField';

const LineUpCouplesEditor = ({ lineUp, onUpdate }: Props) => {
  const { data } = useSWR([api.lineUpsUrl, lineUp.id], getLineUpCouples);

  const lineUpCouples = data?.result || [];
  const totalCouples = lineUp.convokedPlayers.length / 2;
  const missingCouplesLength = data?.result ? totalCouples - lineUpCouples.length : 0;
  let missingCouples: LineUpCouple[] = Array.from({ length: missingCouplesLength }, () => ({
    playerIdA: '',
    playerIdB: '',
    playerScoreA: 0,
    playerScoreB: 0,
    lineUpId: lineUp.id,
  }));

  const sortCouples = (lineUpCouples: LineUpCouple[]) => {
    return lineUpCouples.sort((coupleA: LineUpCouple, coupleB: LineUpCouple) => {
      const totalScoreCoupleA = coupleA.playerScoreA + coupleA.playerScoreB;
      const totalScoreCoupleB = coupleB.playerScoreA + coupleB.playerScoreB;

      if (totalScoreCoupleA < totalScoreCoupleB) return 1;
      if (totalScoreCoupleA > totalScoreCoupleB) return -1;
      return 0;
    });
  };

  // const getPlayerPoints = (player: LineUpPlayer): number => {

  // }

  const playerOptions = lineUp.convokedPlayers.map(
    (player: LineUpPlayer): Option => ({
      id: player.id as string,
      value: `${player.nickname}`,
    })
  );

  const [saveStatus, _] = useLoading();

  const onSave = async () => {};

  const handlePlayerPositionChange = (value: string, i: number) => {};

  return (
    <LineUpCouplesEditorWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12} />
      </Grid>
      <Grid container spacing={0}>
        {sortCouples(lineUpCouples)
          .concat(missingCouples)
          .map((couple: LineUpCouple, i: number) => {
            return (
              <Grid container key={`${couple.playerIdA}-${couple.playerIdB}-${i}`}>
                <Grid item xs={2}>
                  <Info>
                    <span>{`P${i + 1}`}</span>
                    <span>{`Puntos: ${couple.playerScoreA + couple.playerScoreB}`}</span>
                  </Info>
                </Grid>
                <Grid item xs={5}>
                  <PlayerSelector
                    playerId={couple.playerIdA}
                    playerScore={String(couple.playerScoreA)}
                    playerOptions={playerOptions}
                    onChange={(value: string) => handlePlayerPositionChange(value, i)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <PlayerSelector
                    playerId={couple.playerIdB}
                    playerScore={String(couple.playerScoreB)}
                    playerOptions={playerOptions}
                    onChange={(value: string) => handlePlayerPositionChange(value, i)}
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

const PlayerSelector = ({ playerId, playerScore, playerOptions, onChange }: PlayerSelectorProps) => {
  return (
    <Info>
      <Select
        className="player-selector"
        value={playerId}
        options={playerOptions}
        onChange={(value: string) => onChange(value)}
      />
      <TextField id={playerId} label="Puntos" onChange={() => {}} value={playerScore} />
    </Info>
  );
};

interface PlayerSelectorProps {
  playerId: string;
  playerScore: string;
  playerOptions: Option[];
  onChange: (value: string) => void;
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
`;

interface Props {
  lineUp: LineUp;
  onUpdate: (match: Match) => void;
}

export default LineUpCouplesEditor;
