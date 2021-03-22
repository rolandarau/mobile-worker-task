import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getGroupedEventsForDate } from 'src/app/store/selectors/events.selectors';
import { EventsGroupKeyValuePairs } from 'src/app/types';

@Component({
  selector: 'app-event-information',
  templateUrl: './event-information.component.html',
  styleUrls: ['./event-information.component.css'],
})
export class EventInformationComponent implements OnInit {
  constructor(private store: Store<{}>, private route: ActivatedRoute) {}

  public selectedDayEvent$: Observable<EventsGroupKeyValuePairs>;

  ngOnInit(): void {
    this.selectedDayEvent$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        return this.store.select(getGroupedEventsForDate, id);
      })
    );  }
}
