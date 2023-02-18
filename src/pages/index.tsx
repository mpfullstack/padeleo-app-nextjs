import { RootState } from '@/modules/common/redux/store';
import { matchesActions } from '@/modules/matches/redux/matchesSlice';
import { connect, ConnectedProps } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { v4 } from 'uuid';

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
        <Link href="/matches">{`Go to Matches`}</Link>
      </main>
    </>
  );
}

const mapDispatchToProps = { ...matchesActions };
const mapStateToProps = (state: RootState) => {
  return {
    status: state.matches.status,
  };
};

const Matches = ({ status, loadMatches, updatedOrCreatedMatch }: PropsFromRedux) => {
  return (
    <>
      <button onClick={() => loadMatches()}>{`Load matches action`}</button>
      <button
        onClick={() =>
          updatedOrCreatedMatch({
            id: v4(),
            club: 'Padel Indoor Lloret',
            dateAndTime: {
              start: new Date(),
              end: new Date(),
            },
            players: [
              {
                id: v4(),
                name: 'Marc',
              },
            ],
          })
        }
      >{`Create match action`}</button>
      <p>{`Status is: ${status}`}</p>
    </>
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedMatches = connector(Matches);
