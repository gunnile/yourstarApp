import { Star } from '../../models/Star';

export interface StarsState {
  stars: Star[];
  loading?: boolean;
}
