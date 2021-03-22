import { setNewSelectedDay, setWeekDays } from '../actions/calendar.actions';
import {
  calendarReducer,
  CalendarState,
  initialState,
} from './calendar.reducer';
import { weekMock } from '../../testing-mocks';
describe('Calendar Reducer', () => {
  describe('setWeekDays action', () => {
    it('should set weekdays', () => {
      const state: CalendarState = calendarReducer(
        initialState,
        setWeekDays({
          days: weekMock,
        })
      );

      expect(state).toEqual({
        ...initialState,
        ids: [22, 23, 24, 25, 26, 27, 28],
        entities: {
          22: weekMock[0],
          23: weekMock[1],
          24: weekMock[2],
          25: weekMock[3],
          26: weekMock[4],
          27: weekMock[5],
          28: weekMock[6],
        },
        selectedDay: weekMock[6].day,
      });
    });
  });

  describe('fetchEventsSuccess action', () => {
    it('should set new selected day', () => {
      const state: CalendarState = calendarReducer(
        initialState,
        setNewSelectedDay({ day: 12 })
      );

      expect(state).toEqual({ ...initialState, selectedDay: 12 });
    });
  });
});
