import { Title } from '@/modules/common/components/Titles';
import useSWR from 'swr';
import api, { getMatches, getReport } from '@/modules/common/services/api';
import MatchItem from '@/modules/matches/components/MatchItem';
import { useCallback, useState } from 'react';
import { Match, ResponseMatchData } from '@/modules/matches/model';
import { updateMatch, removeMatch } from '@/modules/matches/utils';
import { downloadBlob } from '@/modules/common/utils';
import MatchesTabs, { Key } from '@/modules/matches/components/MatchesTabs';
import FloatingAddButton from '@/modules/common/components/Buttons/FloatingAddButton';
import FloatingDownloadButton from '@/modules/common/components/Buttons/FloatingDownloadButton';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/modules/common/redux/store';
import { useRouter } from 'next/router';
import { ContentWrapper } from '@/modules/common/containers/Layout';

const Matches = ({ user }: PropsFromRedux) => {
  const [tab, setTab] = useState<Key>('coming');
  const { data, mutate } = useSWR([api.matchesUrl, tab], getMatches);
  const router = useRouter();

  const onMatchUpdated = useCallback(
    (updatedMatch: Match) => {
      mutate(
        async currentData => {
          return {
            ...currentData,
            result: updateMatch(currentData?.result as Match[], updatedMatch),
          } as ResponseMatchData;
        },
        { revalidate: false }
      );
    },
    [mutate]
  );

  const onMatchDeleted = useCallback(
    (matchId: string) => {
      mutate(
        async currentData => {
          return {
            ...currentData,
            result: removeMatch(currentData?.result as Match[], matchId),
          } as ResponseMatchData;
        },
        { revalidate: false }
      );
    },
    [mutate]
  );

  return (
    <ContentWrapper admin={!!user?.admin}>
      <Title>{`Partidos`}</Title>
      <MatchesTabs selected={tab} handleTabChange={(key: string) => setTab(key as Key)} />
      {data?.result?.map(match => (
        <MatchItem key={match.id} match={match} onUpdate={onMatchUpdated} onDelete={onMatchDeleted} user={user} />
      ))}
      {user?.admin && (
        <>
          <FloatingDownloadButton
            onClick={async () => {
              const csvText = await getReport();
              downloadBlob(new Blob([csvText], { type: 'text/csv' }), 'report.csv');
            }}
          />
          <FloatingAddButton onClick={() => router.push(`/matches/create`)} />
        </>
      )}
    </ContentWrapper>
  );
};

const mapStateToProps = (state: RootState) => ({ user: state.userAccess.user });
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedMatches = connector(Matches);

export { Matches };

export default ConnectedMatches;
