import Layout from '@/modules/common/containers/Layout';
import Link from 'next/link';
import { Title } from '@/modules/common/components/Titles';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import api, { getMatch } from '@/modules/common/services/api';

export default function EditMatch() {
  const { query } = useRouter();
  const { data } = useSWR(`${api.matchesUrl}/${query.id}`, getMatch);
  return (
    <Layout title="Editar partido">
      <>
        <Title>{`Editar partido`}</Title>
        <p>
          <Link href="/matches">{`Volver`}</Link>
        </p>
        {data?.result && (
          <div>
            <p>{data.result.id}</p>
          </div>
        )}
      </>
    </Layout>
  );
}
