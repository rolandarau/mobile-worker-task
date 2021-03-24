import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FetchEventsRes } from '../types';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#loadEvents', () => {
    it('should return a FetchEventsRes observable', () => {
      const fetchEventsRes: FetchEventsRes = { '2020-10-10': [] };

      service.loadEvents().subscribe((events) => {
        expect(events).toEqual(fetchEventsRes);
      });

      const req = httpMock.expectOne('http://localhost:3000/events');
      expect(req.request.method).toBe('GET');
      req.flush(fetchEventsRes);
    });
  });
});
