import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventsFeatureKey, EventsState } from '../reducers/events.reducer';
import { getWeekDaysEntities } from './calendar.selectors';

export const getEventsState = createFeatureSelector<EventsState>(
  eventsFeatureKey
);

export const getEvents = createSelector(
  getEventsState,
  (state) => state.workEvents
);

export const getIsEventsLoaded = createSelector(
  getEventsState,
  (state) => state.loaded
);

export const getIsEventsLoading = createSelector(
  getEventsState,
  (state) => state.loading
);

export const getGroupedEventsForDate = createSelector(
  getEvents,
  getWeekDaysEntities,
  (workEvents, weekdays, day) => ({
    HOURS_TYPE: [
      workEvents[weekdays[day].fullDate]?.filter((workEvent) => workEvent.isHoursEventType) || []
    ],
    EXPENSES_TYPE: [
      workEvents[weekdays[day].fullDate]?.filter((workEvent) => workEvent.isExpenseType) || []
    ],
    ADDITIONAL_HOURS_TYPE: [
      workEvents[weekdays[day].fullDate]?.filter(
        (workEvent) => workEvent.isAdditionalHoursEventType
      ) || []
    ],
  })
);
