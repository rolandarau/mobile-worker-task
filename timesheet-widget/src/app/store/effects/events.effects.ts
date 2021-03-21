import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';
import { fetchEvents, fetchEventsSuccess } from '../actions/events.actions';

@Injectable()
export class EventsEffects {
  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}

  public loadEvents$: Observable<{}> = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEvents),
      mergeMap(() =>
        this.eventsService
          .loadEvents()
          .pipe(map((events) => fetchEventsSuccess({ events })))
      )
    )
  );
}
