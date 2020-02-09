
import { Event } from '../../models/Event';

export interface EventsState {
  events: Event[];
  loading?: boolean; 
}
