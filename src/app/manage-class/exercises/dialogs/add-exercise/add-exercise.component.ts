import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { SwimStyleService } from 'src/app/share/services/swimStyle.service';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css', '../../../../app.component.css']
})
export class AddExerciseComponent implements OnInit {

  // local variable
  public styles: SwimStyle [] = [];
  public subStyle: any;
  public currentStyle: SwimStyle = new SwimStyle();
  constructor(
    private dialogRef: MatDialogRef<AddExerciseComponent>,
    private swimStyleService: SwimStyleService

  ) {}

  ngOnInit() {
    this.getSwimStyle();
  }

  getSwimStyle() {
    this.subStyle = this.swimStyleService.getAllStyle().subscribe(
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
}
