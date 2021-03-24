import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { eventMock } from 'src/app/testing-mocks';
import { fetchEvents, fetchEventsSuccess } from '../actions/events.actions';
import { EventsEffects } from './events.effects';

describe('Events Effects', () => {
  let actions$: Observable<Action>;
  let effects: EventsEffects;
  let store: MockStore<{}>;
  let eventsService: EventsService;

  const eventsServiceMock: ReturnType<jest.Mock> = { loadEvents: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
        { provide: EventsService, useFactory: () => eventsServiceMock },
      ],
    });

    effects = TestBed.inject(EventsEffects);
    store = TestBed.inject(MockStore);
    eventsService = TestBed.inject(EventsService);
  });

  it('should return fetchEventsSuccess when loadEvents emits value', () => {
    spyOn(eventsService, 'loadEvents').and.returnValue(
      of({ '2020-12-22': [eventMock] })
    );
    actions$ = cold('a', { a: fetchEvents });
    expect(effects.loadEvents$).toBeObservable(
      hot('(a)', {
        a: fetchEventsSuccess({ events: { '2020-12-22': [eventMock] } }),
      })
    );
  });
});
