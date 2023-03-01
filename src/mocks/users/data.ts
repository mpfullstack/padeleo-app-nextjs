import ramdonstring from 'randomstring';
import { User } from '@/modules/users/model';

export const user: User = {
  id: ramdonstring.generate(),
  firstname: 'Marc',
  lastname: '',
  email: '',
};
