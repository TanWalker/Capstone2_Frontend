import { OnInit, OnDestroy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddExerciseComponent } from './dialogs/add-exercise/add-exercise.component';
import { Exercise } from 'src/app/share/models/exercise';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Constants } from 'src/app/share/constants';


const message = {
  message: {
    have_not_exercise: Constants.message.manage_exercise.have_not_exercise
  }
};

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css', '../../app.component.css', './../manage-class.component.css']
})


export class ExercisesComponent implements OnInit, OnDestroy {
  public exercises: Exercise[] = [];
  public subExercise: any;
  public message = message;
  isMobile = null;
  constructor(
    public dialog: MatDialog,
    public exerciseService: ExerciseService,
    private deviceService: DeviceDetectorService
    ) {
      this.isMobile = deviceService.isMobile();
    }

  ngOnInit() {
    this.getExercises();
  }
  ngOnDestroy() {
    if (this.subExercise !== null) { this.subExercise.unsubscribe(); }
  }
  openDialogAddLesson(): void {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.getExercises();
        }
      }
    );
  }
  public getExercises() {
    this.subExercise = this.exerciseService.getAllExercise().subscribe(
      (data: Result) => {
         data.success ? this.exercises = data.values : console.log('can not get exercise');
         console.log(this.exercises);

      }
    );
  }
}
