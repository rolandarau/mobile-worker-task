import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { mapTo, take, tap } from 'rxjs/operators';
import { fetchEvents } from '../store/actions/events.actions';
import {
    getIsEventsLoaded,
    getIsEventsLoading
} from '../store/selectors/events.selectors';

@Injectable({
  providedIn: 'root',
})
export class EventsGuard implements CanActivate {
  constructor(private store: Store<{}>) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.store.select(getIsEventsLoading),
      this.store.select(getIsEventsLoaded),
    ]).pipe(
      tap(([isLoading, isLoaded]) => {
        if (!isLoading && !isLoaded) {
          this.store.dispatch(fetchEvents());
        }
      }),
      mapTo(true),
      take(1)
    );
  }
}
