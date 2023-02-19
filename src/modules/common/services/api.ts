import { Match, ResponseMatchData, ResponseSingleMatchData } from '@/modules/matches/model';
import { User, ResponseUserData, ResponseSingleUserData } from '@/modules/users/model';

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

// Matches API
export const getMatches = get<ResponseMatchData>;

export const getMatch = get<ResponseSingleMatchData>;

export const createMatch = (data: Match) => post<ResponseSingleMatchData, Match>(api.matchesUrl, data);

// Users API
export const getUsers = get<ResponseUserData>;

export const createUser = (data: User) => post<ResponseSingleUserData, User>(api.usersUrl, data);
