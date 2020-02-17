import { Score } from "./Score";
import { Event } from "./Event";

export interface Star {
  id: number;
  name: string;
  image: string;
  description: string;
  type: string;
  events: Event[];
  score_list: Score;
}
