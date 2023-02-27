import Link from 'next/link';
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
      <p>
        <Link href="/matches/create">{`Crea tu partido`}</Link>
      </p>
      {data?.result && (
        <div>
          {data?.result.map(match => {
            return (
              <MatchItem key={match.id} match={match} />
              // <div key={match.id}>
              //   <Link href={`/matches/${match.id}`}>{`Edit Match`}</Link>
              //   <p>{match.club}</p>
              //   <p>{match.startTime?.toString()}</p>
              //   <p>{match.duration}</p>
              //   <p>
              //     {match.players.map(player => {
              //       return (
              //         <>
              //           <span>{player.id}</span>
              //           <br />
              //           <span>{player.firstname}</span>
              //           <br />
              //           <span>{player.nickname}</span>
              //           <br />
              //           <span>{player.email}</span>
              //           <br />
              //         </>
              //       );
              //     })}
              //   </p>
              // </div>
            );
          })}
        </div>
      )}
    </MatchesWrapper>
  );
};

const MatchesWrapper = styled.div`
  width: 100%;
`;

export default Matches;
