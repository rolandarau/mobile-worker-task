import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchEventsRes } from '../types';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private httpClient: HttpClient) {}

  public loadEvents(): Observable<FetchEventsRes> {
    return this.httpClient.get<FetchEventsRes>('http://localhost:3000/events');
  }
}
