import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from '@angular/material';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { YoutubeService } from 'src/app/share/services/youtube.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css', './../../../../app.component.css']
})
export class AddVideoComponent implements OnInit {
  public swimStyles: SwimStyle[];
  public currentStyle;
  public currentLink;
  constructor(
    private dialogRef: MatDialogRef<AddVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    private youtubeService: YoutubeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.exerciseService.getAllStyle().subscribe((result: Result) => {
      // console.log(result);
      if (result.success) {
        this.swimStyles = result.values;
      }
    });
  }
  addVideo() {
    this.youtubeService
      .uploadLinkByStyleId(this.currentLink, this.currentStyle)
      .subscribe((result: Result) => {
        if (result.success) {
          this.dialogRef.close(true);
          this.snackBar.open('Thêm video thành công!', 'Đóng', {
            duration: 6000
          });
        }
        if (!result.success) {
          this.snackBar.open('Lỗi! không thể thêm video', 'Đóng', {
            duration: 6000
          });
        }
      });
  }
  onChangeStyle(event) {
    console.log(this.currentStyle);
  }
}
