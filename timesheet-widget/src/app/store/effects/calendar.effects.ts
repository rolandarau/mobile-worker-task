import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mapTo, switchMap, withLatestFrom } from 'rxjs/operators';
import { ApprovalState } from 'src/app/constants';
import { CalendarDay, FetchEventsRes, WorkEvent } from 'src/app/types';
import { processWeekDays, setWeekDays } from '../actions/calendar.actions';
import { fetchEventsSuccess } from '../actions/events.actions';
import { getEvents } from '../selectors/events.selectors';

@Injectable()
export class CalendarEffects {
  public triggerWeekDaysExtraction$: Observable<{}> = createEffect(() =>
    this.actions$.pipe(ofType(fetchEventsSuccess), mapTo(processWeekDays()))
  );

  public processWeekDays$: Observable<{}> = createEffect(() =>
    this.actions$.pipe(
      ofType(processWeekDays),
      withLatestFrom(this.store.select(getEvents)),
      switchMap(([_, workEvents]) => {
        const days: Date[] = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d;
        });
        return [
          setWeekDays({
            days: this.mapWeekDaysWithEvents(days, workEvents),
          }),
        ];
      })
    )
  );

  private mapWeekDaysWithEvents(
    days: Date[],
    allEvents: FetchEventsRes
  ): CalendarDay[] {
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days
      .map((day) => ({
        fullDate: this.formatDate(day),
        year: day.getFullYear(),
        day: day.getDate(),
        month: day.getMonth(),
        weekday: day.getDay(),
        weekdayName: weekdayNames[day.getDay()],
        workDuration: this.calculateWorkDuration(
          allEvents[this.formatDate(day)]
        ),
        approvalState: this.setApprovalState(allEvents[this.formatDate(day)]),
      }))
      .reverse();
  }

  private calculateWorkDuration(workEvents: WorkEvent[]): number {
    let workDuration: number = 0;
    workEvents?.forEach((workEvent) => {
      if (workEvent.isWorkHour && workEvent.isHoursEventType) {
        workDuration = workDuration + workEvent.quantity;
      }
    });
    console.log(workDuration);
    return workDuration;
  }

  private setApprovalState(workEvents: WorkEvent[]): ApprovalState {
    if (!workEvents) {
      return ApprovalState.NoEvents;
    } else if (workEvents.some((event) => event.isRejected)) {
      return ApprovalState.Rejected;
    } else if (workEvents.every((event) => event.isApproved)) {
      return ApprovalState.Approved;
    } else {
      return ApprovalState.Neutral;
    }
  }

  private formatDate(date: Date): string {
    var d: Date = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  constructor(private actions$: Actions, private store: Store<{}>) {}
}
