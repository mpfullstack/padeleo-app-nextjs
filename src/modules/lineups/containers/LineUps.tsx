import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/modules/common/redux/store';

const LineUps = ({ user }: PropsFromRedux) => {
  return (
    <p>{`Line Ups`}</p>
  );
};

const mapStateToProps = (state: RootState) => ({ user: state.userAccess.user });
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedLineUps = connector(LineUps);

export { LineUps };

export default ConnectedLineUps;
