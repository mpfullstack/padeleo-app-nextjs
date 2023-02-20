import api, { getUsers } from '@/modules/common/services/api';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';

export default function Users() {
  const { data } = useSWR(api.usersUrl, getUsers);

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
        <p>
          <Link href="/users/create">{`Create User`}</Link>
        </p>
        {data?.result && (
          <div>
            {data?.result.map(user => {
              return (
                <div key={user.id}>
                  <p>{user.id}</p>
                  <p>{`${user.firstname} ${user.lastname}`}</p>
                  <p>{user.nickname}</p>
                  <p>{user.email}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
