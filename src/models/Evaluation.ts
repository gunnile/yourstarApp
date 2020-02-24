import { Star } from "./Star";

export interface Evaluation {
    id: number;
    total_score: string;
    total_count: string;
    star_score: string;
    star: Star;
    feed: string;
    user: string; 
  }