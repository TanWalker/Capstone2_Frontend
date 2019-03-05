import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddExerciseComponent } from './dialogs/add-exercise/add-exercise.component';
import { Exercise } from 'src/app/share/models/exercise';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css', '../../app.component.css', './../manage-class.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {
  public exercises: Exercise[] = [];
  public subExercise: any;
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
    this.dialog.open(AddExerciseComponent, {
      disableClose: true
    });
  }
  public getExercises() {
    this.subExercise = this.exerciseService.getAllExercise().subscribe(
      (data: Result) => {
         data.success ? this.exercises = data.values : console.log('can not get exercise');
      }
    );
  }
}
