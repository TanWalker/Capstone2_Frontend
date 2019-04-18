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
  isAddDisabled = true;
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
    if (this.validateYouTubeUrl(this.currentLink)) {
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
            console.log(result);
            this.snackBar.open('Lỗi! không thể thêm video', 'Đóng', {
              duration: 6000
            });
          }
        });
    } else {
      this.snackBar.open('Lỗi! chỉ được thêm link video của youtube', 'Đóng', {
        duration: 6000
      });
    }
  }
  validateYouTubeUrl(url) {
    if (url !== undefined || url !== '') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        console.log('valid');
        return true;
      } else {
        console.log('not valid');
        return false;
      }
    }
  }
  onChange($event) {
    if (/\S/.test($event) && this.currentStyle) {
      // if input empty disable add button
      this.isAddDisabled = false;
    } else {
      // if input isn't empty disable add button
      this.isAddDisabled = true;
    }
  }
  onChangeStyle(event) {
    console.log(this.currentLink);
    if (this.currentStyle && this.currentLink !== undefined) {
      // if input empty disable add button
      this.isAddDisabled = false;
    } else {
      // if input isn't empty disable add button
      this.isAddDisabled = true;
    }
  }
}
