
import { AccessToken } from '../../models/AccessToken';

export interface UserState {
  isLoggedin: boolean;
  username?: string;
  darkMode: boolean;
  hasSeenTutorial: boolean;
  loading: boolean;
  token: AccessToken;
};
