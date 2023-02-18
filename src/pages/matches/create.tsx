import { Match } from '@/modules/matches/model';
import Head from 'next/head';
import Link from 'next/link';

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
        <p>{`Create Match Route`}</p>
        <button
          onClick={() => {
            const match: Match = {
              club: 'rec78JW2gR1Vz7Axi',
              startTime: new Date(),
              duration: 5400,
              players: [],
            };
            fetch('/api/matches', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(match),
            }).then(res => res.json());
          }}
        >{`Create Match`}</button>
        <Link href="/matches">{`Back to matches`}</Link>
      </main>
    </>
  );
}
