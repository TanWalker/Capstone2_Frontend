import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

constructor(
  private http: HttpClient
) { }
 public getAllStyle() {
  return this.http.get(`${environment.urls.api}` + `/public/getStyle`);
}
 public getAllDistance() {
  return this.http.get(`${environment.urls.api}` + `/public/getDistance`);
}
 public getAllExercise() {
  return this.http.get(`${environment.urls.api}` + `/getExercise`);

 }
 public createExercise(exercise: Exercise) {
   return this.http.post(`${environment.urls.api}` + `/Exercise` , exercise );
 }
}
