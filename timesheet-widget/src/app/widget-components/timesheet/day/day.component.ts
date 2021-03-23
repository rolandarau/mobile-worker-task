import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApprovalState, ApprovalStateStyle } from 'src/app/constants';
import { CalendarDay } from 'src/app/types';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit, OnChanges {
  @Input() isToday: boolean;
  @Input() isWeekend: boolean;
  @Input() isMarked: boolean;
  @Input() weekDay: CalendarDay;

  @Output() daySelected: EventEmitter<number> = new EventEmitter();

  public dayStyle: string;
  public calendarItemWrapper: string;
  public tasksStatusColor: string;

  public readonly approvalStates: typeof ApprovalState = ApprovalState;
  public readonly approvalStateStyles: typeof ApprovalStateStyle = ApprovalStateStyle;

  ngOnChanges(changes: SimpleChanges): void {
    if ('isMarked' in changes) {
      this.setDayStyleClass();
    }
  }

  ngOnInit(): void {
    this.setDayStyleClass();
    this.setCalendarItemClass();
  }

  public onWeekDayMarked(id: number): void {
    this.daySelected.emit(id);
  }

  private setDayStyleClass(): void {
    if (this.isToday && !this.isMarked) {
      this.dayStyle = 'day__today';
    } else if (this.isMarked) {
      this.dayStyle = 'day__marked';
    } else {
      this.dayStyle = 'day__other';
    }
  }

  private setCalendarItemClass(): void {
    this.calendarItemWrapper = this.isWeekend ? 'weekend' : 'weekday';
  }
}
