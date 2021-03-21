import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CalendarDay } from 'src/app/types';
import { setNewSelectedDay, setWeekDays } from '../actions/calendar.actions';

export const calendarFeatureKey = 'calendar';

export interface CalendarState extends EntityState<CalendarDay> {
  selectedDay?: number;
}

export const calendarAdapter: EntityAdapter<CalendarDay> = createEntityAdapter({
  selectId: (day) => day.day,
});

export const initialState: CalendarState = calendarAdapter.getInitialState({});

const reducer: ActionReducer<CalendarState, Action> = createReducer(
  initialState,
  on(setWeekDays, (state, { days }) => ({
    ...calendarAdapter.addMany(days, state),
    selectedDay: days[6].day,
  })),
  on(setNewSelectedDay, (state, { day }) => ({
    ...state,
    selectedDay: day,
  }))
);

export function calendarReducer(
  state: CalendarState | undefined,
  action: Action
): CalendarState {
  return reducer(state, action);
}
