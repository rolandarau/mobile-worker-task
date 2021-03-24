import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { FetchEventsRes } from 'src/app/types';
import { fetchEvents, fetchEventsSuccess } from '../actions/events.actions';

export const eventsFeatureKey = 'events';

export interface EventsState {
  workEvents?: FetchEventsRes;
  loading: boolean;
  loaded: boolean;
}

export const initialState: EventsState = {
  loading: false,
  loaded: false,
};

const reducer: ActionReducer<EventsState, Action> = createReducer(
  initialState,
  on(fetchEvents, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(fetchEventsSuccess, (state, { events }) => ({
    ...state,
    workEvents: events,
    loading: false,
    loaded: true,
  }))
);

export function eventsReducer(
  state: EventsState | undefined,
  action: Action
): EventsState {
  return reducer(state, action);
}
