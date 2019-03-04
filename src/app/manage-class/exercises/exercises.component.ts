import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddExerciseComponent } from './dialogs/add-exercise/add-exercise.component';
import { Exercise } from 'src/app/share/models/exercise';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css', '../../app.component.css']
})
export class ExercisesComponent implements OnInit {
  public exercises: Exercise[] = [];
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.getExercises();
  }
  openDialogAddLesson(): void {
    this.dialog.open(AddExerciseComponent, {
      disableClose: true
    });
  }
  public getExercises() {
    const lessonp1 = new Exercise('1', 'lesson1', '2', '300', '3');
    const lessonp2 = new Exercise('2', 'lesson2', '2', '422', '2');
    const lessonp3 = new Exercise('3', 'lesson3', '2', '622', '1');
    const lessonp4 = new Exercise('4', 'lesson4', '2', '854', '6');
    const lessonp5 = new Exercise('5', 'lesson5', '2', '125', '4');

    this.exercises.push(lessonp1);
    this.exercises.push(lessonp2);
    this.exercises.push(lessonp3);
    this.exercises.push(lessonp4);
    this.exercises.push(lessonp5);
    console.log(this.exercises);
  }
}
