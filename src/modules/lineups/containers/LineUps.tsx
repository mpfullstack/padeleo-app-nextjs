import { Title } from '@/modules/common/components/Titles';
import useSWR from 'swr';
import api, { getLineUps } from '@/modules/common/services/api';
import { useState } from 'react';
import FloatingAddButton from '@/modules/common/components/Buttons/FloatingAddButton';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/modules/common/redux/store';
import { useRouter } from 'next/router';
import { ContentWrapper } from '@/modules/common/containers/Layout';
import LineUpsTabs, { Key } from '@/modules/lineups/components/LineUpsTabs';
import LineUpItem from '../components/LineUpItem';

const LineUps = ({ user }: PropsFromRedux) => {
  const [tab, setTab] = useState<Key>('coming');
  const { data } = useSWR([api.lineUpsUrl, tab], getLineUps);
  const router = useRouter();

  return (
    <ContentWrapper admin={!!user?.admin}>
      <Title>{`Convocatorias`}</Title>
      <LineUpsTabs selected={tab} handleTabChange={(key: string) => setTab(key as Key)} />
      {data?.result &&
        data?.result.map(lineUp => (
          <LineUpItem key={lineUp.id} lineUp={lineUp} onUpdate={() => {}} onDelete={() => {}} user={user} />
        ))}
      {user?.admin && <FloatingAddButton onClick={() => router.push(`/lineups/create`)} />}
    </ContentWrapper>
  );
};

const mapStateToProps = (state: RootState) => ({ user: state.userAccess.user });
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedLineUps = connector(LineUps);

export { LineUps };

export default ConnectedLineUps;
