import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../models/exercise';
import { isNullOrUndefined } from 'util';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ManageLessonPlanService {

  private subject = new Subject<any>();
  private exercises: Exercise[] = [];
  constructor() { }

  public addExercise(exercise: Exercise) {

    if (!_.find( this.exercises, exercise)) {
      this.exercises.push(exercise);
    }

    this.subject.next(this.exercises);
  }
  public getExercises() {
    return this.subject.asObservable();
  }

  public destroySubject() {
    if (!isNullOrUndefined(this.subject)) {this.subject.unsubscribe(); }
  }

  public removeExercise(exercise: Exercise) {
    _.remove( this.exercises, {
      id: exercise.id
  });
  }

  public resetExercise() {
    this.exercises = [];
  }
}
