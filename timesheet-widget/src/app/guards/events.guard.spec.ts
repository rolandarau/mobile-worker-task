import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fetchEvents } from '../store/actions/events.actions';
import {
  getIsEventsLoaded,
  getIsEventsLoading,
} from '../store/selectors/events.selectors';
import { EventsGuard } from './events.guard';
import { addMatchers, cold, initTestScheduler } from 'jasmine-marbles';
import SpyInstance = jest.SpyInstance;

describe('EventsGuard', () => {
  let guard: EventsGuard;
  let mockStore: MockStore<{}>;
  let dispatchSpy: SpyInstance;

  beforeEach(() => {
    beforeEach(() => {
      initTestScheduler();
      addMatchers();
    });
    TestBed.configureTestingModule({
      providers: [EventsGuard, provideMockStore()],
    });
    mockStore = TestBed.inject(MockStore);
    guard = TestBed.inject(EventsGuard);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    mockStore.overrideSelector(getIsEventsLoaded, false);
    mockStore.overrideSelector(getIsEventsLoading, false);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should call dispatch when events are not loading or loaded', () => {
      expect(guard.canActivate()).toBeObservable(cold('(a|', { a: true }));
      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should not call dispatch when events already loading', () => {
      mockStore.overrideSelector(getIsEventsLoading, true);
      expect(guard.canActivate()).toBeObservable(cold('(a|', { a: true }));
      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should not call dispatch when events loaded', () => {
      mockStore.overrideSelector(getIsEventsLoaded, true);
      expect(guard.canActivate()).toBeObservable(cold('(a|', { a: true }));
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });
});
