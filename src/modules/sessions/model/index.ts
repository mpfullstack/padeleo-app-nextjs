import { User } from '@/modules/users/model';

export interface Session {
  id: string;
  user: User;
}
