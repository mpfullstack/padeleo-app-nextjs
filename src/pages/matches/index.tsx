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
      </main>
    </>
  );
}
