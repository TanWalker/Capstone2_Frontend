import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { SwimStyle } from 'src/app/share/models/swimStyle';

@Component({
  selector: 'app-swimstyles',
  templateUrl: './swimstyles.component.html',
  styleUrls: ['./swimstyles.component.css', '../../../../app.component.css']
})
export class SwimstylesComponent implements OnInit {
  public SwimStyle: SwimStyle = new SwimStyle();
  isAddDisabled = true;
  public subStyle: any;
  styles: SwimStyle[] = [];
  constructor(
    private dialogRef: MatDialogRef<SwimstylesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private exerciseService: ExerciseService
  ) {}
  ngOnInit() {
    this.getSwimStyle();
  }
  addSwimStyle() {
    console.log(this.SwimStyle);
  }
  onChange(style) {
    if (/\S/.test(style)) {
      // if input empty disable add button
      this.isAddDisabled = false;
    } else {
      // if input isn't empty disable add button
      this.isAddDisabled = true;
    }
  }
  getSwimStyle() {
    this.subStyle = this.exerciseService
      .getAllStyle()
      .subscribe((data: Result) => {
        if (data.success) {
          this.styles = data.values;
          console.log(this.styles);
        } else {
          console.log('Can not get swim style');
        }
      });
  }
}
