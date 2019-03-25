import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LessonExercise } from '../models/lessonExercise';
import { Date } from '../models/date';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) {}
  getLessonByCoach() {
    return this.http.get(`${environment.urls.api}/getLessonByCoach`);
  }
  addLesson(name: String) {
    return this.http.post(`${environment.urls.api}/addLesson`, { name: name });
  }
  addLessonExercise(lessonExercise: LessonExercise) {
    return this.http.post(`${environment.urls.api}/addLessonExercise`, lessonExercise);
  }
  getLessonExerciseByLessonID(id: String) {
    return this.http.get(`${environment.urls.api}` + `/getLessonExerciseByLessonID/${id}`);
  }
  getLessonByDate(date: Date) {
    return this.http.post(`${environment.urls.api}` + `/getLessonByDate/`, date);
  }
}
