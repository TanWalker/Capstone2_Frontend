import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { Result } from 'src/app/share/models/result';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Distance } from 'src/app/share/models/distance';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css', '../../../../app.component.css']
})
export class AddExerciseComponent implements OnInit, OnDestroy {

  // local variable
  public styles: SwimStyle [] = [];
  public distances: Distance [] = [];
  public subStyle: any;
  public subDistance: any;
  public currentStyle: SwimStyle = new SwimStyle();
  constructor(
    private dialogRef: MatDialogRef<AddExerciseComponent>,
    private exerciseService: ExerciseService

  ) {}

  ngOnInit() {
    this.getSwimStyle();
    this.getDistance();
  }

  ngOnDestroy() {
    if ( this.subStyle !== null ) { this.subStyle.unsubscribe(); }
  }
  getSwimStyle() {
    this.subStyle = this.exerciseService.getAllStyle().subscribe(
      (data: Result) => {
      if (data.success) {
        this.styles = data.values ;
        this.currentStyle = this.styles[0];
      } else {
        console.log('Can not get swim style');
      }
      }
    );
  }
  getDistance() {
    this.subDistance = this.exerciseService.getAllDistance().subscribe(
      (data: Result) => {
        if (data.success) {
          this.distances = data.values ;
        } else {
          console.log('Can not get distance');
        }
      }
    );
  }
}
