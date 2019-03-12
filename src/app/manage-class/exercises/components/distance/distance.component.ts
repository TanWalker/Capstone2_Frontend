import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Distance } from 'src/app/share/models/distance';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Constants } from 'src/app/share/constants';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
const message = {
  box: {
    title: Constants.box.delete_distance.title,
    message: Constants.box.delete_distance.message,
    confirm: Constants.box.delete_distance.confirm
  }
};
@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css']
})
export class DistanceComponent implements OnInit {
  @Input() distance: Distance;
  @Input() last: any;
  @Output() isRefresh = new EventEmitter<boolean>();
  public message = message;
  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  deleteThisDistance() {
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      }
    });

    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.exerciseService
          .deleteDistanceById(this.distance.id)
          .subscribe((result: Result) => {
            console.log(result);
            if (result.success) {
              console.log('deleted style');
              messageDialogRef.close(true);
              this.isRefresh.emit(true);
              this.snackBar.open(
                'Đã xóa khoảng cách ' + this.distance.swim_distance + '!',
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
