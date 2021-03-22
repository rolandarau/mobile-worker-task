import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  getSelectedDayNumber,
  getSelectedWeekDayInfo,
  getWeekDays
} from 'src/app/store/selectors/calendar.selectors';
import { calendarDayMock } from '../../testing-mocks';
import { CalendarDay } from '../../types';
import { TimesheetComponent } from './timesheet.component';

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;
  let mockStore: MockStore<{}>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([])],
        declarations: [TimesheetComponent],
        providers: [provideMockStore()],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(
      getWeekDays as MemoizedSelector<{}, CalendarDay[]>,
      [] as CalendarDay[]
    );
    mockStore.overrideSelector(getSelectedDayNumber, 1);
    mockStore.overrideSelector(getSelectedWeekDayInfo, calendarDayMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
