import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fetchEvents } from '../store/actions/events.actions';
import {
  getIsEventsLoaded,
  getIsEventsLoading
} from '../store/selectors/events.selectors';
import { EventsGuard } from './events.guard';


describe('EventsGuard', () => {
  let guard: EventsGuard;
  let mockStore: MockStore<{}>;
  let dispatchSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsGuard, provideMockStore()],
    });
    mockStore = TestBed.inject(MockStore);
    guard = TestBed.inject(EventsGuard);
    mockStore.overrideSelector(getIsEventsLoaded, false);
    mockStore.overrideSelector(getIsEventsLoading, false);
    dispatchSpy = spyOn(mockStore, 'dispatch');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should not call dispatch when events already loading', () => {
      mockStore.overrideSelector(getIsEventsLoading, true);
      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should not call dispatch when events loaded', () => {
      mockStore.overrideSelector(getIsEventsLoaded, true);
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });
});
