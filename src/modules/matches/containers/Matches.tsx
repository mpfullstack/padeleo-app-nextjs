import styled from 'styled-components';
import { Title } from '@/modules/common/components/Titles';
import useSWR from 'swr';
import api, { getMatches } from '@/modules/common/services/api';
import MatchItem from '@/modules/matches/components/MatchItem';
import { useCallback, useState } from 'react';
import { Match, ResponseMatchData } from '@/modules/matches/model';
import { updateMatch, removeMatch } from '@/modules/matches/utils';
import MatchesTabs, { Key } from '@/modules/matches/components/MatchesTabs';
import FloatingAddButton from '@/modules/common/components/Buttons/FloatingAddButton';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/modules/common/redux/store';
import { useRouter } from 'next/router';

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
    <MatchesWrapper admin={!!user?.admin}>
      <Title>{`Partidos`}</Title>
      <MatchesTabs selected={tab} handleTabChange={(key: string) => setTab(key as Key)} />
      {data?.result && (
        <div>
          {data?.result.map(match => (
            <MatchItem key={match.id} match={match} onUpdate={onMatchUpdated} onDelete={onMatchDeleted} user={user} />
          ))}
        </div>
      )}
      {user?.admin && <FloatingAddButton onClick={() => router.push(`/matches/create`)} />}
    </MatchesWrapper>
  );
};

const MatchesWrapper = styled.div<{ admin: boolean }>`
  width: 100%;
  padding-bottom: ${({ admin }) => (admin ? '5rem' : '0')};
`;

const mapStateToProps = (state: RootState) => ({ user: state.userAccess.user });
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedMatches = connector(Matches);

export { Matches };

export default ConnectedMatches;
