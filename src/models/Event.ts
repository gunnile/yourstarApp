import { Star } from './Star';

export interface Event {
  id: number;
  date: string;
  title: string;
  image: string;
  description: string;
  star_list: Star[];
}
