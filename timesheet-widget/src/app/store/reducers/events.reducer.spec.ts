import { fetchEvents, fetchEventsSuccess } from '../actions/events.actions';
import { eventsReducer, EventsState, initialState } from './events.reducer';

describe('Events Reducer', () => {
  describe('fetchEvents action', () => {
    it('should set loading to true', () => {
      const state: EventsState = eventsReducer(initialState, fetchEvents());

      expect(state).toEqual({
        ...initialState,
        loading: true,
        entities: {},
        ids: [],
      });
    });
  });

  describe('fetchEventsSuccess action', () => {
    it('should store data and set loaded to true', () => {
      const state: EventsState = eventsReducer(
        initialState,
        fetchEventsSuccess({ events: [] })
      );

      expect(state).toEqual({
        entities: {},
        ids: [],
        loading: false,
        loaded: true,
      });
    });
  });
});
