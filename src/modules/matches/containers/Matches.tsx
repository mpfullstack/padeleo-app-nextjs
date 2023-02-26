import Link from 'next/link';
import styled from 'styled-components';
import { Title } from '@/modules/common/components/Titles';
import useSWR from 'swr';
import api, { getMatches } from '@/modules/common/services/api';

const Matches = () => {
  const { data } = useSWR(api.matchesUrl, getMatches);

  return (
    <MatchesWrapper>
      <Title>{`Partidos`}</Title>
      <p>
        <Link href="/">{`Back to Home`}</Link>
      </p>
      <p>
        <Link href="/matches/create">{`Create Matches`}</Link>
      </p>
      {data?.result && (
        <div>
          {data?.result.map(match => {
            return (
              <div key={match.id}>
                <Link href={`/matches/${match.id}`}>{`Edit Match`}</Link>
                <p>{match.club}</p>
                <p>{match.startTime?.toString()}</p>
                <p>{match.duration}</p>
                <p>
                  {match.players.map(player => {
                    return (
                      <>
                        <span>{player.id}</span>
                        <br />
                        <span>{player.firstname}</span>
                        <br />
                        <span>{player.nickname}</span>
                        <br />
                        <span>{player.email}</span>
                        <br />
                      </>
                    );
                  })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </MatchesWrapper>
  );
};

const MatchesWrapper = styled.div``;

export default Matches;
