import { StarsActions } from './stars.actions';
import { StarsState } from './stars.state';

export const starsReducer = (state: StarsState, action: StarsActions): StarsState => {
  switch (action.type) {
    case 'set-star-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-stars-data': {
      return { ...state, ...action.stars };
    }
    // case 'set-star-data': {
    //   return { ...state, star: action.star };
    // }
  }
}