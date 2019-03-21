import { Injectable } from '@angular/core';
import { Record } from '../models/record';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

constructor(
  private http: HttpClient
) { }


addRecord(record: Record) {
  return this.http.post(`${environment.urls.api}/addDailyRecord`, record);
}
}
