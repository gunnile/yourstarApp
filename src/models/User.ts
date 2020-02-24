import { StarScore } from "./StarScore";

export interface User {
  id: number;
  username: string;
  image: string;
  access_token: string;
  refresh_token: string;
  user_star_score: StarScore[]
}
                                                           