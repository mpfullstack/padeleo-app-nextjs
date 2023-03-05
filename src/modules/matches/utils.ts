import { Match } from '@/modules/matches/model';

export const updateMatch = (matches: Match[], matchToUpate: Match) => {
  return matches.map((match: Match) => {
    if (matchToUpate.id === match.id) {
      return matchToUpate;
    }
    return match;
  });
};
