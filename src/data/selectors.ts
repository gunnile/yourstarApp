import { createSelector } from 'reselect';
import { Event } from '../models/Event';
import { Star } from '../models/Star';
import { AppState } from './state';

export const getEvents = (state: AppState) => state.event.events;
export const getStars = (state: AppState) => state.star.stars;

const getIdParam = (_state: AppState, props: any) => {
  const stringParam = props.match.params['id'];
  return parseInt(stringParam, 10);
}

export const getEventItem = createSelector(
  getEvents, getIdParam,
  (events, id) => events.find(x => x.id === id)
);

export const getStarItem = createSelector(
  getStars, getIdParam,
  (stars, id) => stars.find(x => x.id === id)
);