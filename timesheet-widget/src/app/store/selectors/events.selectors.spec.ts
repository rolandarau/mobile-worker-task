import {
  mockedCalendarState,
  mockedEventsSate
} from 'src/app/testing-mocks';
import { CalendarState } from '../reducers/calendar.reducer';
import { EventsState } from '../reducers/events.reducer';
import {
  getEventsState,

  getIsEventsLoaded,
  getIsEventsLoading
} from './events.selectors';

describe('Events selectors', () => {
  let state: { events: EventsState; calendar: CalendarState };
  beforeEach(() => {
    state = {
      events: mockedEventsSate,
      calendar: mockedCalendarState,
    };
  });

  it('should return events state', () => {
    expect(getEventsState.projector(state.events)).toEqual(state.events);
  });

  it('should return loaded', () => {
    expect(getIsEventsLoaded.projector(state.events)).toEqual(
      state.events.loaded
    );
  });

  it('should return loading', () => {
    expect(getIsEventsLoading.projector(state.events)).toEqual(
      state.events.loading
    );
  });
});
