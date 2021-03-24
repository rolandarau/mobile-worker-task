import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import MockDate from 'mockdate';
import { Observable } from 'rxjs';
import { ApprovalState } from 'src/app/constants';
import { eventMock } from 'src/app/testing-mocks';
import { CalendarDay } from 'src/app/types';
import { processWeekDays, setWeekDays } from '../actions/calendar.actions';
import { fetchEventsSuccess } from '../actions/events.actions';
import { getEvents } from '../selectors/events.selectors';
import { CalendarEffects } from './calendar.effects';

describe('Calender Effects', () => {
  let actions$: Observable<Action>;
  let effects: CalendarEffects;
  let mockStore: MockStore<{}>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });

    effects = TestBed.inject(CalendarEffects);
    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    actions$ = TestBed.inject(Actions);

    mockStore.overrideSelector(getEvents, {
      '2020-12-22': [
        {
          ...eventMock,
          isAdditionalHoursEventType: false,
          isHoursEventType: true,
        },
      ],
      '2020-12-21': [{ ...eventMock, isApproved: false }],
      '2020-12-20': [{ ...eventMock, isApproved: false, isRejected: true }],
    });
    jest.spyOn(mockStore, 'dispatch');
  });

  const mockedWeek: CalendarDay[] = [
    {
      fullDate: '2020-12-22',
      year: 2020,
      day: 22,
      month: 11,
      weekday: 2,
      weekdayName: 'Tue',
      workDuration: 2,
      approvalState: ApprovalState.Approved,
    },
    {
      fullDate: '2020-12-21',
      year: 2020,
      day: 21,
      month: 11,
      weekday: 1,
      weekdayName: 'Mon',
      workDuration: 0,
      approvalState: ApprovalState.Neutral,
    },
    {
      fullDate: '2020-12-20',
      year: 2020,
      day: 20,
      month: 11,
      weekday: 0,
      weekdayName: 'Sun',
      workDuration: 0,
      approvalState: ApprovalState.Rejected,
    },
    {
      fullDate: '2020-12-19',
      year: 2020,
      day: 19,
      month: 11,
      weekday: 6,
      weekdayName: 'Sat',
      workDuration: 0,
      approvalState: ApprovalState.NoEvents,
    },
    {
      fullDate: '2020-12-18',
      year: 2020,
      day: 18,
      month: 11,
      weekday: 5,
      weekdayName: 'Fri',
      workDuration: 0,
      approvalState: ApprovalState.NoEvents,
    },
    {
      fullDate: '2020-12-17',
      year: 2020,
      day: 17,
      month: 11,
      weekday: 4,
      weekdayName: 'Thu',
      workDuration: 0,
      approvalState: ApprovalState.NoEvents,
    },
    {
      fullDate: '2020-12-16',
      year: 2020,
      day: 16,
      month: 11,
      weekday: 3,
      weekdayName: 'Wed',
      workDuration: 0,
      approvalState: ApprovalState.NoEvents,
    },
  ];

  describe('triggerWeekDaysExtraction$', () => {
    it('should emit processWeekDays when fetchEventsSuccess emits', () => {
      actions$ = cold('-a--', {
        a: fetchEventsSuccess({ events: { '2020-12-22': [eventMock] } }),
      });

      expect(effects.triggerWeekDaysExtraction$).toBeObservable(
        cold('-a--', {
          a: processWeekDays(),
        })
      );
    });
  });

  describe('processWeekDays$', () => {
    it('should map and set 7 past week days to state', () => {
      MockDate.set(
        'Tue 12 22 2020 19:30:09 GMT+0200 (Eastern European Standard Time)'
      );
      actions$ = cold('-a--', { a: processWeekDays });
      expect(effects.extractWeekDays$).toBeObservable(
        hot('-a--', { a: setWeekDays({ days: mockedWeek.reverse() }) })
      );
      expect(router.navigate).toHaveBeenCalledWith(['/timesheet', 22]);
    });
  });
});
