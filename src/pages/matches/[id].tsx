import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const { query } = useRouter();
  console.log(query);
  debugger;
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
      </main>
    </>
  );
}
