import Head from 'next/head';
import Link from 'next/link';
import useSWR, { Fetcher } from 'swr';
import { Data } from '../api/users';

const fetcher: Fetcher<Data> = (key: string) => fetch(key).then(res => res.json());

export default function Home() {
  const { data, isLoading, isValidating } = useSWR('/api/users', fetcher);
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
        <p>{`List Users Route`}</p>
        <p>
          <Link href="/">{`Back to Home`}</Link>
        </p>

        {isLoadingData && <p>{`Loading matches....`}</p>}
        {data?.result && (
          <div>
            {data?.result.map(user => {
              return (
                <div key={user.id}>
                  <p>{user.id}</p>
                  <p>{user.name}</p>
                  <p>{user.nickname}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
