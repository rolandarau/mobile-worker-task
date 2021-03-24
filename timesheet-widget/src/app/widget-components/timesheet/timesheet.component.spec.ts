import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { setNewSelectedDay } from 'src/app/store/actions/calendar.actions';
import {
  getSelectedDayNumber,
  getSelectedWeekDayInfo,
  getWeekDays,
} from 'src/app/store/selectors/calendar.selectors';
import { calendarDayMock } from '../../testing-mocks';
import { CalendarDay } from '../../types';
import { TimesheetComponent } from './timesheet.component';
import SpyInstance = jest.SpyInstance;

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;
  let mockStore: MockStore<{}>;
  let router: Router;
  let dispatchSpy: SpyInstance;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([])],
        declarations: [TimesheetComponent],
        providers: [
          provideMockStore(),
          { provide: Router, useValue: { navigate: jest.fn() } },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    mockStore.overrideSelector(
      getWeekDays as MemoizedSelector<{}, CalendarDay[]>,
      [] as CalendarDay[]
    );
    mockStore.overrideSelector(getSelectedDayNumber, 1);
    mockStore.overrideSelector(getSelectedWeekDayInfo, calendarDayMock);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onDaySelect', () => {
    it('should dispatch setNewSelectedDay and navigate to timesheet when isGoToTodayAction is true', () => {
      component.onDaySelect(2, true);

      expect(router.navigate).toHaveBeenCalledWith(['/timesheet, 2']);
      expect(dispatchSpy).toHaveBeenCalledWith(setNewSelectedDay({ day: 2 }));
    });

    it('should dispatch setNewSelectedDay and navigate empty route when isGoToTodayAction is false', () => {
      component.onDaySelect(2);

      expect(router.navigate).toHaveBeenCalledWith(['']);
      expect(dispatchSpy).toHaveBeenCalledWith(setNewSelectedDay({ day: 2 }));
    });
  });
});
