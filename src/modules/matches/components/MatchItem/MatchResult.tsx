import { Result } from '@/modules/matches/model';
import { User } from '@/modules/users/model';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { Couple } from './MatchPlayers';

const MatchResult = ({ players, results }: Props) => {
  const sets = results.length;
  const size = 12 / sets;

  return (
    <MatchResultWrapper>
      <Grid container spacing={0}>
        <Grid item xs={5} />
        <Grid item xs={7}>
          <Grid container className="header">
            {results.map((result: Result, i: number) => (
              <Grid key={`header-${result.id}-${i}`} item xs={size}>
                {`s`}
                {i + 1}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          <Couple couple={players.slice(0, 2)} display="column" />
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={0}>
            {results.map((result: Result, i: number) => (
              <Grid key={`home-${result.id}-${i}`} item xs={size}>
                <Score>{result.home}</Score>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Couple couple={players.slice(2)} display="column" />
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={0}>
            {results.map((result: Result, i: number) => (
              <Grid key={`away-${result.id}-${i}`} item xs={size}>
                <Score>{result.away}</Score>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </MatchResultWrapper>
  );
};

interface Props {
  matchId: string;
  maxPlayers: number;
  players: User[];
  results: Result[];
}

const MatchResultWrapper = styled.div`
  .MuiGrid-container {
    justify-content: center;
    align-items: center;
    .header {
      text-align: center;
      font-size: 1.4rem;
      font-weight: 600;
    }
  }
`;

const Score = styled.p`
  text-align: center;
  justify-content: center;
  margin: 0.2rem 0;
  font-size: 1.4rem;
`;

export default MatchResult;
