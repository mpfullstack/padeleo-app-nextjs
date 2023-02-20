import Head from 'next/head';
import SignIn from '@/modules/user-access/components/SignIn';

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
        <SignIn />
      </main>
    </>
  );
}
