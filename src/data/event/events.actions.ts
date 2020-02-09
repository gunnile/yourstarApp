import { getEventData } from '../dataApi';
import { ActionType } from '../../util/types';
import { EventsState } from './events.state';

export const loadEventData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getEventData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-event-loading',
  isLoading
} as const);

export const setData = (data: Partial<EventsState>) => ({
  type: 'set-event-data',
  data
} as const);

export type EventsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>