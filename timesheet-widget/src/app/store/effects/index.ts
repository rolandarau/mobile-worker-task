import { CalendarEffects } from './calendar.effects';
import { EventsEffects } from './events.effects';

type EffectsArrayType = Array<typeof EventsEffects | typeof CalendarEffects>;

export const effects: EffectsArrayType = [EventsEffects, CalendarEffects];
