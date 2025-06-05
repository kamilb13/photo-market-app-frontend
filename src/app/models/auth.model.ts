import {User} from './user.model';

export interface AuthResponse {
  jwtToken: string;
  refreshToken: string;
  user: User;
}
