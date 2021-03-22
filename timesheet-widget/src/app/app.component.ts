import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
    this.isEventsLoaded$ = this.store.select(getIsEventsLoaded);
    this.isEventsLoading$ = this.store.select(getIsEventsLoading);
  }
}
