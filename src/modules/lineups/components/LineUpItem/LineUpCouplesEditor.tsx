import useSWR from 'swr';
import Select, { Option } from '@/modules/common/components/Form/Select';
import { Match } from '@/modules/matches/model';
import styled from 'styled-components';
import Grid from '@/modules/common/components/Grid';
import { LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import { useLoading } from '@/modules/common/hooks/useLoading';
import { LineUp, LineUpCouple, LineUpPlayer } from '@/modules/lineups/model';
import api, { getLineUpCouples } from '@/modules/common/services/api';

const LineUpCouplesEditor = ({ lineUp, onUpdate }: Props) => {
  const { data } = useSWR([api.lineUpsUrl, lineUp.id], getLineUpCouples);

  const lineUpCouples = data?.result || [];

  const sortCouples = (lineUpCouples: LineUpCouple[]) => {
    return lineUpCouples.sort((coupleA: LineUpCouple, coupleB: LineUpCouple) => {
      const totalScoreCoupleA = coupleA.playerScoreA + coupleA.playerScoreB;
      const totalScoreCoupleB = coupleB.playerScoreA + coupleB.playerScoreB;

      if (totalScoreCoupleA < totalScoreCoupleB) return 1;
      if (totalScoreCoupleA > totalScoreCoupleB) return -1;
      return 0;
    });
  };

  const playerOptions = lineUp.convokedPlayers.map(
    (player: LineUpPlayer): Option => ({
      id: player.id as string,
      value: player.nickname as string,
    })
  );

  const [saveStatus, _] = useLoading();

  // const totalCouples = lineUpCouples.length;

  const onSave = async () => {};

  const handlePlayerPositionChange = (value: string, i: number) => {};

  return (
    <LineUpCouplesEditorWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12} />
      </Grid>
      <Grid container spacing={0}>
        {sortCouples(lineUpCouples).map((couple: LineUpCouple, i: number) => {
          return (
            <Grid container key={`${couple.playerIdA}-${couple.playerIdB}-${i}`}>
              <Grid item xs={3}>
                <Select
                  className="player-selector"
                  key={`select-${couple.playerIdA}-${i}`}
                  value={couple.playerIdA}
                  options={playerOptions}
                  onChange={(value: string) => handlePlayerPositionChange(value, i)}
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  className="player-selector"
                  key={`select-${couple.playerIdB}-${i}`}
                  value={couple.playerIdB}
                  options={playerOptions}
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

interface Props {
  lineUp: LineUp;
  onUpdate: (match: Match) => void;
}

export default LineUpCouplesEditor;
