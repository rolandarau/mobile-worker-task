import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { EventTypes } from 'src/app/constants';
import {
  getEventsForDayExist,
  getGroupedEventsForDate,
} from 'src/app/store/selectors/events.selectors';
import { EventsGroupKeyValuePairs } from 'src/app/types';

@Component({
  selector: 'app-event-information',
  templateUrl: './event-information.component.html',
  styleUrls: ['./event-information.component.css'],
})
export class EventInformationComponent implements OnInit, OnDestroy {
  constructor(private store: Store<{}>, private route: ActivatedRoute) {}
  public eventsExists$: Observable<boolean>;
  public eventTypes: typeof EventTypes = EventTypes;

  public selectedDayEvent$: Observable<EventsGroupKeyValuePairs>;
  private destroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        tap((params: ParamMap) => {
          const id = params.get('id');
          this.selectedDayEvent$ = this.store.select(
            getGroupedEventsForDate,
            id
          );
          this.eventsExists$ = this.store.select(getEventsForDayExist, id);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
