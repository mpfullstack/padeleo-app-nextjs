import { Match, ResponseMatchData, ResponseSingleMatchData } from '@/modules/matches/model';
import { ResponseClubData } from '@/modules/clubs/model';
import { SignInPayload } from '@/modules/user-access/model';
import { User, ResponseUserData, ResponseSingleUserData } from '@/modules/users/model';
import { ResponseData } from '@/modules/common/model';
import { Key } from '@/modules/matches/components/MatchesTabs';
import { ResponseResultsData, Result } from '@/modules/results/model';
import { ResponseLineUpData } from '@/modules/lineups/model';

const api = {
  matchesUrl: '/api/matches',
  usersUrl: '/api/users',
  resultsUrl: '/api/results',
  signIn: '/api/auth/signin',
  logout: '/api/auth/logout',
  isAuthenticated: '/api/auth',
  clubsUrl: '/api/clubs',
  reportsUrl: '/api/reports',
  lineUpsUrl: '/api/lineups',
};

export default api;

class ApiError<T> {
  status: number;
  data: ResponseData<T> | string;

  constructor(status: number, data: ResponseData<T> | string) {
    this.status = status;
    this.data = data;
  }
}

const handleResponse = async <T>(res: Response) => {
  const data = await res.json();

  if (res.ok) return data;

  throw new ApiError<T>(res.status, data);
};

const handleTextResponse = async (res: Response) => {
  const data = await res.text();

  if (res.ok) return data;

  throw new ApiError(res.status, data);
};

const getQueryUrl = <T>(url: string, params?: T): string => {
  const queryParams = params ? `?` + new URLSearchParams(params) : '';
  const queryUrl = `${url}${queryParams}`;
  return queryUrl;
};

const get = async <T, P = Record<string, any>>(url: string, params?: P): Promise<T> => {
  return await fetch(getQueryUrl<P>(url, params)).then(handleResponse<T>);
};

const getText = async <P = Record<string, any>>(url: string, params?: P): Promise<string> => {
  return await fetch(getQueryUrl<P>(url, params)).then(handleTextResponse);
};

const post = async <T, P>(url: string, data?: P): Promise<T> =>
  await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponse<P>);

const put = async <T, P>(url: string, data?: P): Promise<T> =>
  await fetch(url, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data && JSON.stringify(data),
  }).then(handleResponse<P>);

const del = async <T, P>(url: string): Promise<T> =>
  await fetch(url, {
    method: 'delete',
  }).then(handleResponse<P>);

// Matches API
export const getMatches = ([url, tab]: [string, Key]) => get<ResponseMatchData>(url, { tab });

export const getMatch = get<ResponseSingleMatchData>;

export const updateMatch = (data: Match) => put<ResponseSingleMatchData, Match>(api.matchesUrl, data);

export const createMatch = (data: Match) => post<ResponseSingleMatchData, Match>(api.matchesUrl, data);

export const deleteMatch = (matchId: string) => del<ResponseData<boolean>, null>(`${api.matchesUrl}/${matchId}`);

export const joinMatch = (matchId: string) => put<ResponseSingleMatchData, Match>(`${api.matchesUrl}/${matchId}/join`);

export const leaveMatch = (matchId: string) =>
  put<ResponseSingleMatchData, Match>(`${api.matchesUrl}/${matchId}/leave`);

// Users API
export const getUsers = get<ResponseUserData>;

export const createUser = (data: User) => post<ResponseSingleUserData, User>(api.usersUrl, data);

// Auth API
export const isAuthenticated = () => get<ResponseData<boolean>>(api.isAuthenticated);

export const signIn = (data: SignInPayload) => post<ResponseData<User>, SignInPayload>(api.signIn, data);

export const logout = () => post<ResponseData<void>, {}>(api.logout, {});

// Results API
export const updateResults = (data: Result[]) => post<ResponseResultsData, Result[]>(api.resultsUrl, data);

// Clubs API
export const getClubs = get<ResponseClubData>;

// Reports API
export const getReport = () => getText(api.reportsUrl);
// LineUps API
export const getLineUps = ([url, tab]: [string, Key]) => get<ResponseLineUpData>(url, { tab });
