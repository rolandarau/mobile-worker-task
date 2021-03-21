import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchEvents } from './store/actions/events.actions';
import { getIsEventsLoaded, getIsEventsLoading } from './store/selectors/events.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{}>) {}

  public isEventsLoaded$: Observable<boolean>;
  public isEventsLoading$: Observable<boolean>;

  ngOnInit(): void {
    //TODO: move to guard
    this.store.dispatch(fetchEvents());
    this.isEventsLoaded$ = this.store.select(getIsEventsLoaded);
    this.isEventsLoading$ = this.store.select(getIsEventsLoading);
  }
}
