import { OnInit, OnDestroy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddExerciseComponent } from './dialogs/add-exercise/add-exercise.component';
import { Exercise } from 'src/app/share/models/exercise';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Constants } from 'src/app/share/constants';
import { SwimstylesComponent } from './dialogs/swimstyles/swimstyles.component';
import { DistancesComponent } from './dialogs/distances/distances.component';
import { ManageLessonPlanService } from 'src/app/share/services/manageLessonPlan.service';

const message = {
  message: {
    have_not_exercise: Constants.message.manage_exercise.have_not_exercise
  }
};

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: [
    './exercises.component.css',
    '../../app.component.css',
    './../manage-class.component.css'
  ]
})
export class ExercisesComponent implements OnInit, OnDestroy {
  public exercises: Exercise[] = [];
  public subExercise: any;
  public message = message;
  public isMobile = false;
  public subTypeOfExercies: any;
  public typeOfExercises: any;
  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    public deviceService: DeviceDetectorService,
    private manageLessonService: ManageLessonPlanService
  ) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
    this.getExercises();
    this.getTypeOfExercises();
  }
  ngOnDestroy() {
    if (this.subExercise !== null) {
      this.subExercise.unsubscribe();
    }
    if (this.subTypeOfExercies !== null) {
      this.subTypeOfExercies.unsubscribe();
    }

    // this.manageLessonService.destroySubject();
  }
  openDialogDistance() {
    const dialogRef = this.dialog.open(DistancesComponent, {
      disableClose: true,
      // autoFocus: false
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }
  openDialogSwimStyle() {
    const dialogRef = this.dialog.open(SwimstylesComponent, {
      disableClose: true,
      // autoFocus: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }
  openDialogAddLesson(): void {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      disableClose: true,
      maxWidth: '300px',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getExercises();
      }
    });
  }
  public getExercises() {
    this.subExercise = this.exerciseService
      .getAllExercise()
      .subscribe((data: Result) => {
        console.log(data);
        data.success
          ? (this.exercises = data.values)
          : console.log('can not get exercise');
      });
  }
  public getTypeOfExercises() {
    this.subTypeOfExercies = this.exerciseService.getTypeOfExercise().subscribe(
    (data: Result) => {
      this.typeOfExercises = data.success ? data.values : [];
    }
    );
  }
  public isSended($event: Exercise) {
    this.manageLessonService.addExercise($event);
  }
}
