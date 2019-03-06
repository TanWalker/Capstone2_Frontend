import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

constructor(private http: HttpClient) { }
getScheduleByCoach() {
  return this.http.get(`${environment.urls.api}/getSchedule`);
}
}
