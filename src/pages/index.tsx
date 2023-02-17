import { matchesActions, RootState } from '@/redux/store';
import { connect, ConnectedProps } from 'react-redux';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Padeleo App`}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>{`Padeleo App`}</p>
        <ConnectedMatches />
      </main>
    </>
  );
}

const mapDispatchToProps = { ...matchesActions };
const mapStateToProps = (state: RootState) => {
  return {
    loading: state.matches.loading,
  };
};

const Matches = ({ loading, loadMatches }: PropsFromRedux) => {
  return (
    <>
      <button onClick={() => loadMatches()}>{`Load matches action`}</button>
      <p>{`Is loading: ${loading}`}</p>
    </>
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedMatches = connector(Matches);
