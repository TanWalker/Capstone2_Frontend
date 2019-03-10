import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSnackBar
} from '@angular/material';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Constants } from 'src/app/share/constants';
const message = {
  box: {
    title: Constants.box.create_swimStyle.title,
    message: Constants.box.create_swimStyle.message,
    confirm: Constants.box.create_swimStyle.confirm
  }
};
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
  public message = message;
  constructor(
    private dialogRef: MatDialogRef<SwimstylesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.getSwimStyle();
  }
  addSwimStyle() {
    console.log(this.SwimStyle);
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      }
    });

    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        // openloading
        this.exerciseService
          .addStyle(this.SwimStyle)
          .subscribe((result: Result) => {
            if (result.success) {
              console.log('generated');
              console.log(result.values);
              messageDialogRef.close(true);
              this.getSwimStyle();
              this.snackBar.open(
                'Đã thêm kiểu ' + this.SwimStyle.swim_name + ' mới!',
                'đóng',
                {
                  duration: 4000
                }
              );
            } else {
              console.log('create error');
            }
            // closeloading
          });
      }
    });
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
