import { ApprovalState, EventTypes } from './constants';
import { CalendarState } from './store/reducers/calendar.reducer';
import { EventsState } from './store/reducers/events.reducer';
import { CalendarDay, WorkEvent } from './types';

export const calendarDayMock: CalendarDay = {
  fullDate: '2020-12-22',
  year: 2020,
  day: 22,
  month: 12,
  weekday: 3,
  weekdayName: 'Tuesday',
  workDuration: 1,
  approvalState: ApprovalState.Approved,
};

export const eventMock: WorkEvent = {
  quantity: 2,
  price: 44,
  eventTypeName: EventTypes.AdditionalHoursType,
  isExpenseType: false,
  isHoursEventType: false,
  isAdditionalHoursEventType: true,
  isWorkHour: true,
  isApproved: true,
  isRejected: false,
  tasksCount: 2,
  firstTaskStart: '07:00',
  lastTaskEnd: '09:00',
};

export const weekMock: CalendarDay[] = [
  calendarDayMock,
  { ...calendarDayMock, day: 23 },
  { ...calendarDayMock, day: 24 },
  { ...calendarDayMock, day: 25 },
  { ...calendarDayMock, day: 26 },
  { ...calendarDayMock, day: 27 },
  { ...calendarDayMock, day: 28 },
];

export const mockedEventsSate: EventsState = {
  loading: false,
  loaded: false,
  workEvents: { '2020-12-22': [eventMock] },
};

export const mockedCalendarState: CalendarState = {
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
};
