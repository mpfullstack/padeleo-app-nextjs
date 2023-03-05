import { Match, ResponseMatchData, ResponseSingleMatchData } from '@/modules/matches/model';
import { SignInPayload } from '@/modules/user-access/model';
import { User, ResponseUserData, ResponseSingleUserData } from '@/modules/users/model';
import { ResponseData } from '@/modules/common/model';
import { Key } from '@/modules/matches/components/MatchesTabs';

const api = {
  matchesUrl: '/api/matches',
  usersUrl: '/api/users',
  signIn: '/api/auth/signin',
  logout: '/api/auth/logout',
  isAuthenticated: '/api/auth',
};

export default api;

class ApiError<T> {
  status: number;
  data: ResponseData<T>;

  constructor(status: number, data: ResponseData<T>) {
    this.status = status;
    this.data = data;
  }
}

const handleResponse = async <T>(res: Response) => {
  const data = await res.json();

  if (res.ok) return data;

  throw new ApiError<T>(res.status, data);
};

const get = async <T, P = Record<string, any>>(url: string, params?: P): Promise<T> => {
  const queryParams = params ? `?` + new URLSearchParams(params) : '';
  const queryUrl = `${url}${queryParams}`;
  return await fetch(queryUrl).then(handleResponse<T>);
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

// Matches API
export const getMatches = ([url, tab]: [string, Key]) => get<ResponseMatchData>(url, { tab });

export const getMatch = get<ResponseSingleMatchData>;

export const createMatch = (data: Match) => post<ResponseSingleMatchData, Match>(api.matchesUrl, data);

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
