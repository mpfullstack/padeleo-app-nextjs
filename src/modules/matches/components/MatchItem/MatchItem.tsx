import styled from 'styled-components';
import { Match } from '@/modules/matches/model/index';
import { format } from '@/modules/common/services/dates';
import { Paragraph } from './styles';
import MatchStatus from './MatchStatus';
import MatchTime from './MatchTime';
import CourtBooked from './CourtBooked';
import Actions from './Actions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/modules/common/redux/store';

const MatchItem = ({ match, user }: Props) => {
  return (
    <MatchItemWrapper>
      <Content>
        <ClubName>{match.clubName || `Sin definir`}</ClubName>
        <CourtBooked booked={match.courtBooked} />
        <Paragraph>{match.startTime ? format(match.startTime, 'EEEE dd/MM/yyyy') : `Fecha sin definir`}</Paragraph>
        <MatchTime startTime={match.startTime} duration={match.duration} />
      </Content>
      <SideContent>
        <MatchStatus match={match} />
        <Actions match={match} user={user} />
      </SideContent>
    </MatchItemWrapper>
  );
};

const MatchItemWrapper = styled.div`
  width: 100%;
  padding: 1.2rem 1.2rem;
  margin-bottom: 2rem;
  text-transform: inherit;
  -webkit-box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
`;

const ClubName = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0;
`;

const SideContent = styled(Content)`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;
`;

interface Props extends PropsFromRedux {
  match: Match;
}

const mapStateToProps = (state: RootState) => ({ user: state.userAccess.user });
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedMatchItem = connector(MatchItem);

export { MatchItem };

export default ConnectedMatchItem;
