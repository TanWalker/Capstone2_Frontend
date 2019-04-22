import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Exercise } from '../models/exercise';
import { SwimStyle } from '../models/swimStyle';
import { Distance } from '../models/distance';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(private http: HttpClient) {}
  public getAllStyle() {
    return this.http.get(`${environment.urls.api}` + `/public/getStyle`);
  }
  public getAllStyleWithBackground() {
    return this.http.get(`${environment.urls.api}` + `/getBackground`);
  }
  public addStyle(swimStyle: SwimStyle) {
    return this.http.post(`${environment.urls.api}` + `/addStyle`, swimStyle);
  }
  public deleteStylebyId(style_id: String) {
    return this.http.delete(
      `${environment.urls.api}` + `/deleteStyle/${style_id}`
    );
  }
  public addDistance(distance: Distance) {
    return this.http.post(`${environment.urls.api}` + `/addDistance`, distance);
  }
  public deleteDistanceById(distance_id: String) {
    return this.http.delete(
      `${environment.urls.api}` + `/deleteDistance/${distance_id}`
    );
  }
  public getAllDistance() {
    return this.http.get(`${environment.urls.api}` + `/public/getDistance`);
  }
  public getAllExercise() {
    return this.http.get(`${environment.urls.api}` + `/getExercise`);
  }
  public createExercise(exercise: Exercise) {
    return this.http.post(`${environment.urls.api}` + `/addExercise`, exercise);
  }

  public getExerciseByCoach() {
    return this.http.get(`${environment.urls.api}` + `/getExerciseByCoach`);
  }
  public getTypeOfExercise() {
    return this.http.get(
      `${environment.urls.api}` + `/public/getTypeOfExercise`
    );
  }
  public getStyleById(style_id) {
    return this.http.get(
      `${environment.urls.api}` + `/getStyleById/${style_id}`
    );
  }
  public getExerciseByLessonID(lesson_id) {
    return this.http.get(
      `${environment.urls.api}` + `/getExerciseByLessonID/${lesson_id}`
    );
  }
}
