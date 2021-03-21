import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FullWeekdayNames, MonthNames } from 'src/app/constants';
import { setNewSelectedDay } from 'src/app/store/actions/calendar.actions';
import {
  getSelectedDayNumber,
  getSelectedWeekDayInfo,
  getWeekDays
} from 'src/app/store/selectors/calendar.selectors';
import { CalendarDay } from 'src/app/types';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  constructor(private store: Store<{}>, private router: Router) {}

  public weekDays$: Observable<CalendarDay[]>;
  public selectedDay$: Observable<number>;
  public selectedDayInfo$: Observable<CalendarDay>;

  public readonly monthNames: typeof MonthNames = MonthNames;
  public readonly fullWeekdayNames: typeof FullWeekdayNames = FullWeekdayNames;

  ngOnInit(): void {
    this.weekDays$ = this.store.select(getWeekDays);
    this.selectedDay$ = this.store.select(getSelectedDayNumber);
    this.selectedDayInfo$ = this.store.select(getSelectedWeekDayInfo);
  }

  public onDaySelect(day: number): void {
    this.router.navigate(['']);
    this.store.dispatch(setNewSelectedDay({ day: day }));
  }
}
