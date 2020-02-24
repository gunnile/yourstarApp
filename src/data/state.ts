import { combineReducers } from './combineReducers';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  user: {
    isLoggedin: false,
    loading: false,
    username: '',
    token: undefined
  }
};


export const reducers = combineReducers({
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;