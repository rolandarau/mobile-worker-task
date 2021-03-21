import { fetchEvents, fetchEventsSuccess } from './events.actions';

describe('Events actions', () => {
  it('should create fetchEvents action', () => {
    expect(fetchEvents()).toEqual({ type: fetchEvents.type });
  });

  it('should create fetchEventsSuccess action', () => {
    expect(fetchEventsSuccess({ events: [] })).toEqual({
      type: fetchEventsSuccess.type,
      events: [],
    });
  });
});
