import styled from 'styled-components';
import { Title } from '@/modules/common/components/Titles';
import useSWR from 'swr';
import api, { getMatches } from '@/modules/common/services/api';
import MatchItem from '@/modules/matches/components/MatchItem';
import { useCallback, useState } from 'react';
import { Match, ResponseMatchData } from '@/modules/matches/model';
import { updateMatch } from '@/modules/matches/utils';
import MatchesTabs, { Key } from '@/modules/matches/components/MatchesTabs';

const Matches = () => {
  const [tab, setTab] = useState<Key>('coming');
  const { data, mutate } = useSWR([api.matchesUrl, tab], getMatches);

  const onUpdatedMatch = useCallback(
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

  return (
    <MatchesWrapper>
      <Title>{`Partidos`}</Title>
      <MatchesTabs selected={tab} handleTabChange={(key: string) => setTab(key as Key)} />
      {data?.result && (
        <div>
          {data?.result.map(match => (
            <MatchItem key={match.id} match={match} onUpdate={onUpdatedMatch} />
          ))}
        </div>
      )}
    </MatchesWrapper>
  );
};

const MatchesWrapper = styled.div`
  width: 100%;
`;

export default Matches;
