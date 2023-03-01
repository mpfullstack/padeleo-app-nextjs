import { Match, ResponseMatchData, ResponseSingleMatchData } from '@/modules/matches/model';
import { SignInPayload } from '@/modules/user-access/model';
import { User, ResponseUserData, ResponseSingleUserData } from '@/modules/users/model';
import { ResponseData } from '@/modules/common/model';

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

const get = async <T, P = Record<string, any>>(url: string, params?: P): Promise<T> =>
  await fetch(url).then(handleResponse<T>);

const post = async <T, P>(url: string, data?: P): Promise<T> =>
  await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponse<P>);

// Matches API
export const getMatches = get<ResponseMatchData>;

export const getMatch = get<ResponseSingleMatchData>;

export const createMatch = (data: Match) => post<ResponseSingleMatchData, Match>(api.matchesUrl, data);

// Users API
export const getUsers = get<ResponseUserData>;

export const createUser = (data: User) => post<ResponseSingleUserData, User>(api.usersUrl, data);

// Auth API
export const isAuthenticated = () => get<ResponseData<boolean>>(api.isAuthenticated);

export const signIn = (data: SignInPayload) => post<ResponseData<User>, SignInPayload>(api.signIn, data);

export const logout = () => post<ResponseData<void>, {}>(api.logout, {});
