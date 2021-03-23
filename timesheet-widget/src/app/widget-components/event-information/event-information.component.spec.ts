import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import {
  getEventsForDayExist,
  getGroupedEventsForDate
} from 'src/app/store/selectors/events.selectors';
import { EventInformationComponent } from './event-information.component';

describe('EventInformationComponent', () => {
  let component: EventInformationComponent;
  let fixture: ComponentFixture<EventInformationComponent>;
  let store: MockStore<{}>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EventInformationComponent],
        providers: [
          provideMockStore(),
          {
            provide: ActivatedRoute,
            useValue: { paramMap: of(convertToParamMap({ id: 1 })) },
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInformationComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(getGroupedEventsForDate, {
      HOURS_TYPE: [],
      EXPENSES_TYPE: [],
      ADDITIONAL_HOURS_TYPE: [],
    });
    store.overrideSelector(getEventsForDayExist, true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
