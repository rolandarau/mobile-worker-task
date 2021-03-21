import { setNewSelectedDay, setWeekDays } from "./calendar.actions";

describe('Calendar actions', () => {
    it('should create setWeekDays action', () => {
      expect(setWeekDays({days: []})).toEqual({ type: setWeekDays.type, days: [] });
    });
  
    it('should create fetchEventsSuccess action', () => {
      expect(setNewSelectedDay({ day: 1 })).toEqual({
        type: setNewSelectedDay.type,
        day: 1,
      });
    });
  });