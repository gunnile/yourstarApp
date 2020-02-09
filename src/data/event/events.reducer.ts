import { EventsActions } from './events.actions';
import { EventsState } from './events.state';

export const eventsReducer = (state: EventsState, action: EventsActions): EventsState => {
  switch (action.type) {
    case 'set-event-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-event-data': {
      return { ...state, ...action.data };
    }
  }
}