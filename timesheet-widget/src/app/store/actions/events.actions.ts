import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { FetchEventsRes } from 'src/app/types';

export enum EventsActions {
  FetchEvents = '[Timesheet Widget] fetch events',
  FetchEventsSuccess = '[Timesheet Widget] fetch events success',
}

export const fetchEvents: ActionCreator<
  EventsActions.FetchEvents,
  () => TypedAction<EventsActions.FetchEvents>
> = createAction(EventsActions.FetchEvents);

export const fetchEventsSuccess: ActionCreator<
  EventsActions.FetchEventsSuccess,
  (props: {
    events: FetchEventsRes;
  }) => {
    events: FetchEventsRes;
  } & TypedAction<EventsActions.FetchEventsSuccess>
> = createAction(
  EventsActions.FetchEventsSuccess,
  props<{ events: FetchEventsRes }>()
);
