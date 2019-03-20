import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { ManageLessonPlanService } from 'src/app/share/services/manageLessonPlan.service';
import { Exercise } from 'src/app/share/models/exercise';
import { Lesson } from 'src/app/share/models/lesson';
import { LessonService } from 'src/app/share/services/lesson.service';
import { LessonExercise } from 'src/app/share/models/lessonExercise';
import { MatDialog } from '@angular/material';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Constants } from 'src/app/share/constants';


const message = {
  box: {
    title: Constants.box.create_schedule.title,
    message: Constants.box.create_schedule.message,
    confirm: Constants.box.create_schedule.confirm
  }
};
@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.component.html',
  styleUrls: [
    './lesson-plan.component.css',
    '../../../app.component.css',
    './../../manage-class.component.css'
  ]
})
export class LessonPlanComponent implements OnInit, OnDestroy {

  public isMobile = false;
  public typeExs: any;
  public subTypeExs: any;
  public exercises: Exercise[] = [];
  public isAddNewLesson = false;
  public subLessons: any;
  public lessons: Lesson[] = [];
  public nameOfLesson = '';
  public message = message;
  public lessonExercises: LessonExercise[] = [];
  public subLessonExercise: any;
  constructor(
    public deviceService: DeviceDetectorService,
    private exerciseService: ExerciseService,
    private manageLessonPlanService: ManageLessonPlanService,
    private lessonService: LessonService,
    private dialog: MatDialog
  ) {
    this.isMobile = deviceService.isMobile();
   }

  ngOnInit() {
    this.getListTypeOfExercises();
    this.autoGetListExerViaRXJ();
    this.getListLesson();
  }

  ngOnDestroy() {
    if ( this.subLessons !== null ) { this.subLessons.unsubscribe(); }
    if ( this.subTypeExs !== null ) { this.subTypeExs.unsubscribe(); }

  }
  getListTypeOfExercises() {
    this.subTypeExs = this.exerciseService.getTypeOfExercise().subscribe(
        (data: Result) => {
          this.typeExs = data.success ? data.values : [];
        }
    );
  }
  autoGetListExerViaRXJ() {
    this.manageLessonPlanService.getExercises().subscribe(
      (data) => {
      this.exercises = data;
      }
    );
  }
  removeEx($event: Exercise) {
    this.manageLessonPlanService.removeExercise($event);
  }
  addNewLesson() {
    this.isAddNewLesson  = true;
  }
  getListLesson() {
    this.subLessons = this.lessonService.getLessonByCoach().subscribe(
          (data: Result) => {
              this.lessons = data.success ? data.values : [];
          }
    );
  }
  setUpdate() {
    this.isAddNewLesson = false;
  }
  setCreate() {
    this.isAddNewLesson = true;

  }

  addOrUpdate() {
    if ( this.isAddNewLesson) {
          this.addLessonExercise();
    } else {

    }
  }

  addLessonExercise() {
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      },
      panelClass: 'alert-bg'
    });
    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.lessonService.addLesson(this.nameOfLesson).subscribe(
          (response: Result) => {
           if (response.success) {
             this.exercises.forEach(exercise => {
               const lesson = res.value;
               const lessonExercise =  new LessonExercise();
               lessonExercise.lesson_id = lesson.id;
               lessonExercise.exercise_id = exercise.id;
               lessonExercise.type_of_exercise_id = exercise.type_id;
               lessonExercise.is_important = false;
               this.lessonService.addLessonExercise(lessonExercise).subscribe((result: Result) => {} );
             });
           }
          }
         );
      }
    });
  }

  changeLesson(id: String) {
      console.log(id);
      this.subLessonExercise = this.lessonService.getLessonExerciseByLessonID(id).subscribe(
        (data: Result) => {
          console.log(data);
        }
      );
  }
}
