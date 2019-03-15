import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { Result } from 'src/app/share/models/result';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Distance } from 'src/app/share/models/distance';
import { Constants } from 'src/app/share/constants';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Exercise } from 'src/app/share/models/exercise';
import { isNullOrUndefined } from 'util';

const message = {
  box: {
    title: Constants.box.create_exericise.title,
    message: Constants.box.create_exericise.message,
    confirm: Constants.box.create_exericise.confirm
  },
  error: {
    have_not_exercise: Constants.message.manage_exercise.have_not_exercise
  }
};
@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css', '../../../../app.component.css']
})
export class AddExerciseComponent implements OnInit, OnDestroy {

  // local variable
  public message = message;
  public styles: SwimStyle [] = [];
  public distances: Distance [] = [];
  public subStyle: any;
  public subDistance: any;
  public currentStyle: SwimStyle = new SwimStyle();
  public subCreate: any;
  public exercise: Exercise = new Exercise();
  public subTypeOfExercise: any;
  public typeOfExercise: any;
  constructor(
    private dialogRef: MatDialogRef<AddExerciseComponent>,
    private exerciseService: ExerciseService,
    private dialog: MatDialog

  ) {}

  ngOnInit() {
    this.getSwimStyle();
    this.getDistance();
    this.getTypeOfExercise();
  }

  ngOnDestroy() {
    if ( this.subStyle !== null ) { this.subStyle.unsubscribe(); }
    if ( this.subDistance !== null ) { this.subDistance.unsubscribe(); }
    if ( this.subTypeOfExercise !== null ) { this.subTypeOfExercise.unsubscribe(); }

    if ( !isNullOrUndefined( this.subCreate)) { this.subCreate.unsubscribe(); }

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
  getTypeOfExercise() {
    this.subTypeOfExercise = this.exerciseService.getTypeOfExercise().subscribe(
      (data: Result) => {
          this.typeOfExercise = data.success ? data.values : [] ;
      }
    );
  }
  createExercise() {

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
        // set name of swim style
        this.exercise.style = this.currentStyle.swim_name;
        this.subCreate = this.exerciseService.createExercise(this.exercise).subscribe(
          (result: Result) => {
            result.success ? this.dialogRef.close(true) : console.log('create exercise fail');
          }
        );
      }
    });
  }
}
