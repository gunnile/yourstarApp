import { combineReducers } from './combineReducers';
import { eventsReducer } from './event/events.reducer';
import { starsReducer } from './star/stars.reducer';
import { userReducer } from './user/user.reducer';

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
    access_token: ''
  }
};

export const reducers = combineReducers({
  event: eventsReducer,
  star: starsReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;