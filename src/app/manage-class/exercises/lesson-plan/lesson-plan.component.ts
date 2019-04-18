import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { ManageLessonPlanService } from 'src/app/share/services/manageLessonPlan.service';
import { Exercise } from 'src/app/share/models/exercise';
import { Lesson } from 'src/app/share/models/lesson';
import { LessonService } from 'src/app/share/services/lesson.service';
import { LessonExercise } from 'src/app/share/models/lessonExercise';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Constants } from 'src/app/share/constants';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

const message = {
  box: {
    title: Constants.box.create_lesson_exercise.title,
    message: Constants.box.create_lesson_exercise.message,
    confirm: Constants.box.create_lesson_exercise.confirm
  },
  editBox: {
    title: Constants.box.update_lesson_exercise.title,
    message: Constants.box.update_lesson_exercise.message,
    confirm: Constants.box.update_lesson_exercise.confirm
  },
  error: Constants.error.create_lesson_plan.name,
  snackBar: {
    success: Constants.snackBar.add_lesson_plan.success,
    fail: Constants.snackBar.add_lesson_plan.fail,
    title: Constants.snackBar.add_lesson_plan.title
  },
  snackBarUpdate: {
    success: Constants.snackBar.add_lesson_plan.success,
    fail: Constants.snackBar.add_lesson_plan.fail,
    title: Constants.snackBar.add_lesson_plan.title
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
  public currentLesson: Lesson = new Lesson();

  // form
  public isSubmit = false;
  public createLessonPlanForm: FormGroup;
  public nameOfLessonPLan = new FormControl('', [Validators.required]);
  constructor(
    public deviceService: DeviceDetectorService,
    private exerciseService: ExerciseService,
    private manageLessonPlanService: ManageLessonPlanService,
    private lessonService: LessonService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
    this.getListTypeOfExercises();
    this.autoGetListExerViaRXJ();
    this.getListLesson();
    this.initialValidation();
  }

  ngOnDestroy() {
    if (this.subLessons !== null) {
      this.subLessons.unsubscribe();
    }
    if (this.subTypeExs !== null) {
      this.subTypeExs.unsubscribe();
    }
  }
  // form
  initialValidation() {
    this.createLessonPlanForm = this.formBuilder.group({});
    this.createLessonPlanForm.addControl(
      'nameOfLessonPLan',
      this.nameOfLessonPLan
    );
  }
  getListTypeOfExercises() {
    this.subTypeExs = this.exerciseService
      .getTypeOfExercise()
      .subscribe((data: Result) => {
        this.typeExs = data.success ? data.values : [];
      });
  }
  autoGetListExerViaRXJ() {
    this.manageLessonPlanService.getExercises().subscribe(data => {
      this.exercises = data;
    });
  }
  removeEx($event: Exercise) {
    this.manageLessonPlanService.removeExercise($event);
  }
  addNewLesson() {
    this.isAddNewLesson = true;
  }
  getListLesson() {
    this.subLessons = this.lessonService
      .getLessonByCoach()
      .subscribe((data: Result) => {
        if (data.success) {
          this.lessons = data.values;
          if (data.values.length !== 0) {
            this.currentLesson = this.lessons[0];
            console.log(this.currentLesson);
            this.changeLesson(this.currentLesson.id);
          }
        }
      });
  }
  setUpdate() {
    this.isAddNewLesson = false;
  }
  setCreate() {
    this.isAddNewLesson = true;
  }

  addOrUpdate() {
    if (this.isAddNewLesson) {
      this.addLessonExercise();
    } else {
      this.updateLessonExercise();
    }
  }

  addLessonExercise() {
    // set isSubmit
    this.isSubmit = true;
    // check validation
    if (this.createLessonPlanForm.invalid) {
      return;
    }

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
        this.lessonService
          .addLesson(this.nameOfLesson)
          .subscribe((response: Result) => {
            if (response.success) {
              this.exercises.forEach(exercise => {
                const lesson = response.value;
                const lessonExercise = new LessonExercise();
                lessonExercise.lesson_id = lesson.id;
                lessonExercise.exercise_id = exercise.id;
                lessonExercise.type_of_exercise_id = exercise.type_id;
                lessonExercise.is_important = false;
                this.lessonService
                  .addLessonExercise(lessonExercise)
                  .subscribe((result: Result) => {});
              });

              // reset list lesson
              this.getListLesson();
              // show message
              this.snackBar.open(
                this.message.snackBar.success,
                this.message.snackBar.title,
                {
                  duration: 6000
                }
              );
            } else {
              this.snackBar.open(
                this.message.snackBar.fail,
                this.message.snackBar.title,
                {
                  duration: 3000
                }
              );
            }
          });
      }
    });

    // set isSubmit
    this.isSubmit = true;
  }
  updateLessonExercise() {
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.editBox.title,
        message: this.message.editBox.message,
        confirm: this.message.editBox.confirm
      },
      panelClass: 'alert-bg'
    });
    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        // first delete all lesson exercise
        this.lessonService
          .deleteLessonExercise(this.currentLesson.id)
          .subscribe((deleted: Result) => {
            if (deleted.success) {
              // second we will add new lesson exercise
              this.exercises.forEach(exercise => {
                const lesson = this.currentLesson;
                const lessonExercise = new LessonExercise();
                lessonExercise.lesson_id = lesson.id;
                lessonExercise.exercise_id = exercise.id;
                lessonExercise.type_of_exercise_id = exercise.type_id;
                lessonExercise.is_important = false;
                this.lessonService
                  .addLessonExercise(lessonExercise)
                  .subscribe((result: Result) => {});
              });
              // show message
              this.snackBar.open(
                this.message.snackBar.success,
                this.message.snackBar.title,
                {
                  duration: 6000
                }
              );
            } else {
              this.snackBar.open(
                this.message.snackBar.fail,
                this.message.snackBar.title,
                {
                  duration: 3000
                }
              );
            }
          });
      }
    });
  }
  changeLesson(id: String) {
    this.subLessonExercise = this.lessonService
      .getLessonExerciseByLessonID(id)
      .subscribe((data: Result) => {
        this.exercises = data.success ? data.values : [];
        this.manageLessonPlanService.setExercise(this.exercises);
      });
  }
}
