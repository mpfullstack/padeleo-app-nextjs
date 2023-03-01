import styled from 'styled-components';
import { Title } from '@/modules/common/components/Titles';
import useSWR from 'swr';
import api, { getMatches } from '@/modules/common/services/api';
import MatchItem from '@/modules/matches/components/MatchItem';

const Matches = () => {
  const { data } = useSWR(api.matchesUrl, getMatches);

  return (
    <MatchesWrapper>
      <Title>{`Partidos`}</Title>
      {data?.result && (
        <div>
          {data?.result.map(match => (
            <MatchItem key={match.id} match={match} />
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
