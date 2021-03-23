import {
  mockedCalendarState,
  mockedEventsSate,
  weekMock,
} from 'src/app/testing-mocks';
import { CalendarState } from '../reducers/calendar.reducer';
import { EventsState } from '../reducers/events.reducer';
import {
  getCalendarState,
  getSelectedDayNumber,
  getSelectedWeekDayInfo,
  getWeekDaysEntities,
} from './calendar.selectors';

describe('Calendar selectors', () => {
  let state: { events: EventsState; calendar: CalendarState };
  beforeEach(() => {
    state = {
      events: mockedEventsSate,
      calendar: mockedCalendarState,
    };
  });

  it('should return calendar state', () => {
    expect(getCalendarState.projector(state.calendar)).toEqual(state.calendar);
  });

  it('should return weekDays entities', () => {
    expect(getWeekDaysEntities.projector(state.calendar)).toEqual(
      state.calendar.entities
    );
  });

  it('should return selectedDay', () => {
    expect(getSelectedDayNumber.projector(state.calendar)).toEqual(
      state.calendar.selectedDay
    );
  });

  it('should return selected weekday object', () => {
    expect(getSelectedWeekDayInfo.projector(22, weekMock)).toEqual(weekMock[0]);
  });
});
