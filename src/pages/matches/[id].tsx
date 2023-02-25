import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import api, { getMatch } from '@/modules/common/services/api';

export default function EditMatch() {
  const { query } = useRouter();
  const { data, isLoading } = useSWR(`${api.matchesUrl}/${query.id}`, getMatch);
  return (
    <>
      <Head>
        <title>{`Padeleo App`}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>{`Edit Match Route`}</p>
        <Link href="/matches">{`Back to matches`}</Link>
        {isLoading && <p>{`Loading match...`}</p>}
        {data?.result && (
          <div>
            <p>{data.result.id}</p>
          </div>
        )}
      </main>
    </>
  );
}
