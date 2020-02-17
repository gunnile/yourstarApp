import { getStarData, getStarsData } from '../dataApi';
import { ActionType } from '../../util/types';
import { StarsState } from './stars.state';



export const setLoading = (isLoading: boolean) => ({
  type: 'set-star-loading',
  isLoading
} as const);

export const setStarsData = (stars: Partial<StarsState>) => ({
  type: 'set-stars-data',
  stars
} as const);

export type StarsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setStarsData>
