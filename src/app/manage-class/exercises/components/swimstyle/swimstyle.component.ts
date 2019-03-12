import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { Constants } from 'src/app/share/constants';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
const message = {
  box: {
    title: Constants.box.delete_swimStyle.title,
    message: Constants.box.delete_swimStyle.message,
    confirm: Constants.box.delete_swimStyle.confirm
  }
};
@Component({
  selector: 'app-swimstyle',
  templateUrl: './swimstyle.component.html',
  styleUrls: ['./swimstyle.component.css', '../../../../app.component.css']
})
export class SwimstyleComponent implements OnInit {
  @Input() style: SwimStyle;
  @Input() last: any;
  @Output() isRefresh = new EventEmitter<boolean>();
  public message = message;
  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log(this.last);
  }
  deleteThisStyle() {
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
        this.exerciseService
          .deleteStylebyId(this.style.id)
          .subscribe((result: Result) => {
            console.log(result);
            if (result.success) {
              console.log('deleted style');
              messageDialogRef.close(true);
              this.isRefresh.emit(true);
              this.snackBar.open(
                'Xóa kiểu ' + this.style.swim_name + ' thành công!',
                'Đóng',
                {
                  duration: 6000
                }
              );
            } else {
              console.log('delete error');
            }
          });
      }
    });
  }
}
