import { combineReducers } from './combineReducers';
import { eventsReducer } from './event/events.reducer';
import { starsReducer } from './star/stars.reducer';
import { userReducer } from './user/user.reducer';
import { AccessToken} from '../models/AccessToken'
import { star } from 'ionicons/icons';

const emptyToken = {
  "access_token": "",
  "expires_in": 0,
  "token_type": "",
  "scope": "",
  "refresh_token": ""  
}

export const initialState: AppState = {
  event: {
    events: [],
    loading: false
  },
  star: {
    stars : [],
    loading: false
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: false,
    loading: false,
    token: emptyToken
  }
};


export const reducers = combineReducers({
  event: eventsReducer,
  star: starsReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;