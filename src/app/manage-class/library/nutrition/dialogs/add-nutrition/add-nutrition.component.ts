import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSnackBar
} from '@angular/material';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-add-nutrition',
  templateUrl: './add-nutrition.component.html',
  styleUrls: [
    './add-nutrition.component.css',
    './../../../../../app.component.css'
  ]
})
export class AddNutritionComponent implements OnInit {
  public currentStyle;
  public currentLink;
  isAddDisabled = true;
  constructor(
    private dialogRef: MatDialogRef<AddNutritionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private youtubeService: YoutubeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  addVideo() {
    this.youtubeService
      .uploadLinkNutrition(this.currentLink)
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
}
