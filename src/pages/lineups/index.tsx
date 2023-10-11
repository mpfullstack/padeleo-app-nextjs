import Layout from '@/modules/common/containers/Layout';
import LineUps from '@/modules/lineups/containers/LineUps';

export default function MatchesList() {
  return (
    <Layout type="interior" title="Convocatorias">
      <LineUps />
    </Layout>
  );
}
