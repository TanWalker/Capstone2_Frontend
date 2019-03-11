import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Exercise } from '../models/exercise';
import { SwimStyle } from '../models/swimStyle';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(private http: HttpClient) {}
  public getAllStyle() {
    return this.http.get(`${environment.urls.api}` + `/public/getStyle`);
  }
  public addStyle(swimStyle: SwimStyle) {
    return this.http.post(`${environment.urls.api}` + `/Style`, swimStyle);
  }
  public deleteStylebyId(style_id: any) {
    return this.http.delete(`${environment.urls.api}` + `/deleteStyle/${style_id}`);
  }
  public getAllDistance() {
    return this.http.get(`${environment.urls.api}` + `/public/getDistance`);
  }
  public getAllExercise() {
    return this.http.get(`${environment.urls.api}` + `/getExercise`);
  }
  public createExercise(exercise: Exercise) {
    return this.http.post(`${environment.urls.api}` + `/Exercise`, exercise);
  }

  public getExerciseByCoach() {
    return this.http.get(`${environment.urls.api}` + `/getExerciseByCoach`);
  }
}
