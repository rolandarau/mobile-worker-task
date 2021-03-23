import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  calendarAdapter,
  calendarFeatureKey,
  CalendarState,
} from '../reducers/calendar.reducer';

export const getCalendarState = createFeatureSelector<CalendarState>(
  calendarFeatureKey
);

export const { selectAll: getWeekDays } = calendarAdapter.getSelectors(
  getCalendarState
);

export const getWeekDaysEntities = createSelector(
  getCalendarState,
  (state) => state.entities
);

export const getSelectedDayNumber = createSelector(
  getCalendarState,
  (calendarState) => calendarState.selectedDay as number
);

export const getSelectedWeekDayInfo = createSelector(
  getSelectedDayNumber,
  getWeekDays,
  (selectedDay, weekDays) => {
    return weekDays.find((weekday) => weekday.day === selectedDay);
  }
);
