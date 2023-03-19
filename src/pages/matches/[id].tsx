import Layout from '@/modules/common/containers/Layout';
import MatchDetail from '@/modules/matches/containers/MatchDetail';
import { Title } from '@/modules/common/components/Titles';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import api, { getMatch } from '@/modules/common/services/api';

export default function EditMatch() {
  const { query } = useRouter();
  const { data } = useSWR(query.id && `${api.matchesUrl}/${query.id}`, getMatch);

  return (
    <Layout type="interior" title="Editar partido">
      <>
        <Title>{`Editar partido`}</Title>
        {data?.result && <MatchDetail match={data.result} />}
      </>
    </Layout>
  );
}
