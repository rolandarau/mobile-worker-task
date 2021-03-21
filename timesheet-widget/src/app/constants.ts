import { MonthsKeyValuePairs, WeekdaysKeyValuePairs } from './types';

export const MonthNames: MonthsKeyValuePairs = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export const FullWeekdayNames: WeekdaysKeyValuePairs = {
  Sun: 'Sunday',
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
};

export enum EventTypes {
  HoursType = 'HOURS_TYPE',
  ExpensesType = 'EXPENSES_TYPE',
  AdditionalHoursType = 'ADDITIONAL_HOURS_TYPE',
}

export enum ApprovalState {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Neutral = 'Neutral',
  NoEvents = 'NoEvents',
}

export const ApprovalStateStyle: Record<
  ApprovalState.Approved | ApprovalState.Neutral | ApprovalState.Rejected,
  string
> = {
  [ApprovalState.Approved]: 'mat-icon--green',
  [ApprovalState.Rejected]: 'mat-icon--red',
  [ApprovalState.Neutral]: 'mat-icon--grey',
};
