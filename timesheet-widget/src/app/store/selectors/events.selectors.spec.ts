import {
  eventMock,
  mockedCalendarState,
  mockedEventsSate,
} from 'src/app/testing-mocks';
import { CalendarState } from '../reducers/calendar.reducer';
import { EventsState } from '../reducers/events.reducer';
import {
  getEvents,
  getEventsForDayExist,
  getEventsState,
  getGroupedEventsForDate,
  getIsEventsLoaded,
  getIsEventsLoading,
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

  it('should return events', () => {
    expect(getEvents.projector(state.events)).toEqual(state.events.workEvents);
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

  it('should return grouped events for date', () => {
    expect(
      getGroupedEventsForDate.projector(
        state.events.workEvents,
        state.calendar.entities,
        22
      )
    ).toEqual({
      HOURS_TYPE: [],
      EXPENSES_TYPE: [],
      ADDITIONAL_HOURS_TYPE: [eventMock],
    });
  });

  it('should return true if events for day exist', () => {
    expect(
      getEventsForDayExist.projector(
        state.events.workEvents,
        state.calendar.entities,
        22
      )
    ).toBe(true);
  });
});
