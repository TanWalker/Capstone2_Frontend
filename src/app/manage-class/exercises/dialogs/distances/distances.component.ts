import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { Distance } from 'src/app/share/models/distance';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Constants } from 'src/app/share/constants';
const message = {
  box: {
    title: Constants.box.create_distance.title,
    message: Constants.box.create_distance.message,
    confirm: Constants.box.create_distance.confirm
  }
};
@Component({
  selector: 'app-distances',
  templateUrl: './distances.component.html',
  styleUrls: ['./distances.component.css', '../../../../app.component.css']
})
export class DistancesComponent implements OnInit {
  public distance: Distance = new Distance();
  distances: Distance[] = [];
  public message = message;
  isAddDisabled = true;
  constructor(
    private dialogRef: MatDialogRef<DistancesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getDistances();
  }
  getDistances() {
    this.exerciseService.getAllDistance().subscribe((data: Result) => {
      if (data.success) {
        this.distances = data.values;
      } else {
        console.log('Can not get swim style');
      }
    });
  }
  addDistance() {
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
          .addDistance(this.distance)
          .subscribe((result: Result) => {
            if (result.success) {
              console.log('generated');
              console.log(result.values);
              messageDialogRef.close(true);
              this.getDistances();
              this.snackBar.open(
                'Đã thêm khoảng cách ' + this.distance.swim_distance + ' mới!',
                'Đóng',
                {
                  duration: 6000
                }
              );
              this.distance.swim_distance = null;
              // this.isAddDisabled = true;
            } else {
              console.log('create error');
            }
          });
      }
    });
  }
  onChange($event) {
    if (/\S/.test($event)) {
      // if input empty disable add button
      this.isAddDisabled = false;
    } else {
      // if input isn't empty disable add button
      this.isAddDisabled = true;
    }
  }
  refreshDistances($event) {
    console.log($event);
    if ($event) {
      setTimeout(() => {
        this.getDistances();
      }, 50);
    }
  }
}
