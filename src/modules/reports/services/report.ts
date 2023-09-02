import { Exporter, Reporter, SourceData } from '@/modules/reports/services/types';
import { Report } from '@/modules/reports/model';
import { User } from '@/modules/users/model';
import { Match } from '@/modules/matches/model';
import { Result, Side } from '@/modules/results/model';

export class AirtableReporter implements Reporter {
  exporter: Exporter;
  private gamesToWinSet = 6;

  constructor(exporter: Exporter) {
    this.exporter = exporter;
  }

  generate({ users, matchesByUser }: SourceData): Report[] {
    const reports = matchesByUser.map((matches: Match[], i: number) => {
      const user = users[i];
      return {
        username: user.nickname as string,
        playedMatches: matches.length,
        completedMatches: this.getCompletedMatches(matches),
        wonMatches: this.getWonMatches(matches, user),
        lostMatches: this.getLostMatches(matches, user),
        wonGames: this.getWonGames(matches, user),
        lostGames: this.getLostGames(matches, user),
      };
    });
    return reports;
  }

  export<T>(data: Report[]): T {
    return this.exporter.export(data);
  }

  getCompletedMatches(matches: Match[]): number {
    return (
      matches?.filter((match: Match) => {
        return this.isMatchCompleted(match);
      })?.length || 0
    );
  }

  isMatchCompleted(match: Match): boolean {
    const results = match.results;
    return (
      results.length > 1 &&
      results.every((result: Result) => {
        return result.home >= this.gamesToWinSet || result.away >= this.gamesToWinSet;
      })
    );
  }

  getWonMatches(matches: Match[], user: User): number {
    return (
      matches?.filter((match: Match) => {
        return this.isMatchCompleted(match) && this.isMatchWon(match, user);
      })?.length || 0
    );
  }

  getLostMatches(matches: Match[], user: User): number {
    return (
      matches?.filter((match: Match) => {
        return this.isMatchCompleted(match) && !this.isMatchWon(match, user);
      })?.length || 0
    );
  }

  isMatchWon(match: Match, player: User): boolean {
    const playerSide = this.getPlayerSide(match.players, player);
    return match.results.every((result: Result) => {
      return result[playerSide] >= this.gamesToWinSet;
    });
  }

  getWonGames(matches: Match[], user: User): number {
    return matches?.reduce((accum: number, match: Match) => {
      const side = this.getPlayerSide(match.players, user);
      return accum + match.results.reduce((accum: number, result: Result) => accum + result[side], 0);
    }, 0);
  }

  getLostGames(matches: Match[], user: User): number {
    return matches?.reduce((accum: number, match: Match) => {
      const otherSide = this.getPlayerSide(match.players, user) === 'home' ? 'away' : 'home';
      return accum + match.results.reduce((accum: number, result: Result) => accum + result[otherSide], 0);
    }, 0);
  }

  getPlayerSide(players: User[], player: User): Side {
    const pos = players.findIndex((user: User) => user.nickname === player.nickname);
    return pos > 1 ? 'away' : 'home';
  }
}
