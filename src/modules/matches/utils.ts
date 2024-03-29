import { Match } from '@/modules/matches/model';

export const updateMatch = (matches: Match[], matchToUpate: Match) => {
  return matches.map((match: Match) => {
    if (matchToUpate.id === match.id) {
      return matchToUpate;
    }
    return match;
  });
};

export const removeMatch = (matches: Match[], matchId: string) =>
  matches.filter((match: Match) => match.id !== matchId);

export const hasResults = (match: Match): boolean => !!match.results?.length;
