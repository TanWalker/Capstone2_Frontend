import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Schedule } from '../models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) {}
  getScheduleByCoach() {
    return this.http.get(`${environment.urls.api}/getSchedule`);
  }
  addSchedule(schedule: Schedule) {
    return this.http.post(`${environment.urls.api}/addSchedule`, schedule);
  }
  updateSchedule(schedule: Schedule) {
    return this.http.put(`${environment.urls.api}/updateSchedule`, schedule);
  }

  // get default schedule by current date
  getDefaultScheduleByCurrentDate() {
    return this.http.get(`${environment.urls.api}/getDefaultSchedule`);
  }
}
