import Layout from '@/modules/common/containers/Layout';
import SignIn from '@/modules/user-access/components/SignIn';

export default function Home() {
  return (
    <Layout title="Inicio de sesión">
      <SignIn />
    </Layout>
  );
}
