import { User } from '../../users/user.entity';

export interface BlogInterface {
  username: string;
  email: string;
  password: string;
  user: User;
}