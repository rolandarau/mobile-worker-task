import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { CalendarDay } from 'src/app/types';

export enum CalendarActions {
  SetWeekDays = '[Timesheet Widget] set week days',
  SetNewSelectedDay = '[Timesheet Widget] set new selected day',
  ProcessWeekDays = '[Timesheet Widget] process week days',
}

export const processWeekDays: ActionCreator<
  CalendarActions.ProcessWeekDays,
  () => TypedAction<CalendarActions.ProcessWeekDays>
> = createAction(CalendarActions.ProcessWeekDays);

export const setWeekDays: ActionCreator<
  CalendarActions.SetWeekDays,
  (props: {
    days: CalendarDay[];
  }) => {
    days: CalendarDay[];
  } & TypedAction<CalendarActions.SetWeekDays>
> = createAction(CalendarActions.SetWeekDays, props<{ days: CalendarDay[] }>());

export const setNewSelectedDay: ActionCreator<
  CalendarActions.SetNewSelectedDay,
  (props: {
    day: number;
  }) => {
    day: number;
  } & TypedAction<CalendarActions.SetNewSelectedDay>
> = createAction(CalendarActions.SetNewSelectedDay, props<{ day: number }>());
