import { Match, ResponseMatchData, ResponseSingleMatchData } from '@/modules/matches/model';
import { ResponseUserData } from '@/modules/users/model';

const api = {
  matchesUrl: '/api/matches',
  usersUrl: '/api/users',
};
export default api;

const get = async <T, P = Record<string, any>>(url: string, params?: P): Promise<T> =>
  await fetch(url).then(res => res.json());

const post = async <T, P>(url: string, data?: P): Promise<T> =>
  await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getMatches = get<ResponseMatchData>;

export const getMatch = get<ResponseSingleMatchData>;

export const createMatch = (data: Match) => post<ResponseSingleMatchData, Match>(api.matchesUrl, data);

export const getUsers = get<ResponseUserData>;
