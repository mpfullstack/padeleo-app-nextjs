import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import api, { getMatches } from '@/modules/common/services/api';

export default function Matches() {
  const { data, isLoading, isValidating } = useSWR(api.matchesUrl, getMatches);
  const isLoadingData = isLoading || isValidating;
  return (
    <>
      <Head>
        <title>{`Padeleo App`}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>{`List Matches Route`}</p>
        <p>
          <Link href="/">{`Back to Home`}</Link>
        </p>
        <p>
          <Link href="/matches/create">{`Create Matches`}</Link>
        </p>
        {data?.result && (
          <div>
            {data?.result.map(match => {
              return (
                <div key={match.id}>
                  <Link href={`/matches/${match.id}`}>{`Edit Match`}</Link>
                  <p>{match.club}</p>
                  <p>{match.startTime?.toString()}</p>
                  <p>{match.duration}</p>
                  <p>
                    {match.players.map(player => {
                      return (
                        <>
                          <span>{player.id}</span>
                          <br />
                          <span>{player.firstname}</span>
                          <br />
                          <span>{player.nickname}</span>
                          <br />
                          <span>{player.email}</span>
                          <br />
                        </>
                      );
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
