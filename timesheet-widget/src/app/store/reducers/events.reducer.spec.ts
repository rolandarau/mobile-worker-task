import { fetchEvents, fetchEventsSuccess } from '../actions/events.actions';
import { eventsReducer, EventsState, initialState } from './events.reducer';

describe('Events Reducer', () => {
  describe('fetchEvents action', () => {
    it('should set loading to true', () => {
      const state: EventsState = eventsReducer(initialState, fetchEvents());

      expect(state).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('fetchEventsSuccess action', () => {
    it('should store data and set loaded to true', () => {
      const state: EventsState = eventsReducer(
        initialState,
        fetchEventsSuccess({ events: {} })
      );

      expect(state).toEqual({
        loading: false,
        loaded: true,
        workEvents: {}
      });
    });
  });
});
