
import { AccessToken } from '../../models/AccessToken';

export interface UserState {
  isLoggedin: boolean;
  username?: string;
  loading: boolean;
  token?: string;
};
