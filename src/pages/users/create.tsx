import { createUser } from '@/modules/common/services/api';
import Head from 'next/head';
import Link from 'next/link';

export default function CreateUser() {
  return (
    <>
      <Head>
        <title>{`Padeleo App`}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>{`Create User Route`}</p>
        <button
          onClick={() => {
            createUser({
              firstname: 'Markkus',
              lastname: 'Perez',
              email: 'markkus@gmail.com',
              nickname: 'markkus',
            });
          }}
        >{`Create User`}</button>
        <Link href="/users">{`Back to users`}</Link>
      </main>
    </>
  );
}
