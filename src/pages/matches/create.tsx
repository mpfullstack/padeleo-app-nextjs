import Layout from '@/modules/common/containers/Layout';
import { Title } from '@/modules/common/components/Titles';
import MatchDetail from '@/modules/matches/containers/MatchDetail';
import { Match } from '@/modules/matches/model';

export default function CreateMatchPage() {
  return (
    <Layout type="interior" title="Crear partido">
      <>
        <Title>{`Crear partido`}</Title>
        <MatchDetail match={{} as Match} />
      </>
    </Layout>
  );
}
