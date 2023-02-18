import Head from 'next/head';
import Link from 'next/link';
import useSWR, { Fetcher } from 'swr';
import { Data } from '../api/matches';

const fetcher: Fetcher<Data> = (key: string) => fetch(key).then(res => res.json());

export default function Home() {
  const { data, isLoading, isValidating } = useSWR('/api/matches', fetcher);
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
        <p>
          <Link href="/matches/1">{`Edit Match 1`}</Link>
        </p>
        {isLoadingData && <p>{`Loading matches....`}</p>}
        {data?.result && (
          <div>
            {data?.result.map(match => {
              return (
                <div key={match.id}>
                  <p>{match.id}</p>
                  <p>{match.club}</p>
                  <p>{match.startTime?.toString()}</p>
                  <p>{match.duration}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}