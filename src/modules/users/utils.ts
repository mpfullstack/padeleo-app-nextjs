import { User } from './model';

export const isAdmin = (user?: User) => !!user?.admin;
