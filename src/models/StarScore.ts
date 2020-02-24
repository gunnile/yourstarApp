import { ScoreName } from './ScoreName';
import { Star } from './Star';

export interface StarScore {
    overall: string;
    star : Star;
    score_list: ScoreName[];
    feed : string;
    
  }
  