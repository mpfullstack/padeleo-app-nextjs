import Layout from '@/modules/common/containers/Layout';
import Matches from '@/modules/matches/containers/Matches';

export default function MatchesList() {
  return (
    <Layout type="interior" title="Tus partidos">
      <Matches />
    </Layout>
  );
}
