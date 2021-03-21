import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayComponent } from './widget-components/timesheet/day/day.component';
import { EventInformationComponent } from './widget-components/event-information/event-information.component';
import { TimesheetComponent } from './widget-components/timesheet/timesheet.component';
import { effects } from './store/effects';
import {
  calendarFeatureKey,
  calendarReducer
} from './store/reducers/calendar.reducer';
import {
  eventsFeatureKey,
  eventsReducer
} from './store/reducers/events.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    DayComponent,
    EventInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      [eventsFeatureKey]: eventsReducer,
      [calendarFeatureKey]: calendarReducer,
    }),
    HttpClientModule,
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
