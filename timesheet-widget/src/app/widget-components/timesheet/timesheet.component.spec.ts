import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { calendarDayMock } from '../../testing-mocks';
import {
  getSelectedDayNumber,
  getSelectedWeekDayInfo,
  getWeekDays,
} from 'src/app/store/selectors/calendar.selectors';
import { TimesheetComponent } from './timesheet.component';
import { CalendarDay } from '../../types';

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;
  let mockStore: MockStore<{}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimesheetComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

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
