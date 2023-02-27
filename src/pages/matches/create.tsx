import { createMatch } from '@/modules/common/services/api';
import { Button } from '@/modules/common/components/Buttons';
import Head from 'next/head';
import Link from 'next/link';

export default function CreateMatch() {
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
        <Button
          onClick={() => {
            createMatch({
              id: '',
              clubId: 'rec78JW2gR1Vz7Axi',
              clubName: 'Padel Indoor Lloret',
              startTime: new Date().toString(),
              duration: 5400,
              players: [],
            });
          }}
        >{`Crear partido`}</Button>
        <Link href="/matches">{`Back to matches`}</Link>
      </main>
    </>
  );
}
