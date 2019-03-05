import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

constructor(
  private http: HttpClient
) { }
 public getAllStyle() {
  return this.http.get(`${environment.urls.api}` + `/getStyle`);
}
 public getAllDistance() {
  return this.http.get(`${environment.urls.api}` + `/getDistance`);
}
}
