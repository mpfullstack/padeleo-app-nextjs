import styled from 'styled-components';
import { Match } from '@/modules/matches/model';
import { getMatchStatus, isUserInMatch } from '../../model/utils';
import { LoadingButton } from '@mui/lab';
import { User } from '@/modules/users/model';

const Actions = ({ match, user }: Props) => {
  const isClosed = getMatchStatus(match) === 'closed';
  const userIsInMatch = isUserInMatch(match, user);

  return (
    <Wrapper>
      {userIsInMatch && <LoadingButton color="secondary" variant="contained">{`Salir`}</LoadingButton>}
      {!userIsInMatch && !isClosed && <LoadingButton variant="contained">{`Me apunto`}</LoadingButton>}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: flex;
  margin-top: auto;
  button {
    font-size: 1.3rem;
  }
`;

interface Props {
  match: Match;
  user?: User;
}

export default Actions;
