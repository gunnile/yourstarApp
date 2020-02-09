import { getStarData } from '../dataApi';
import { ActionType } from '../../util/types';
import { StarsState } from './stars.state';

export const loadStarData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getStarData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-star-loading',
  isLoading
} as const);

export const setData = (data: Partial<StarsState>) => ({
  type: 'set-star-data',
  data
} as const);

export type StarsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
