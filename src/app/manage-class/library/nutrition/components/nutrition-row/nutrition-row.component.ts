import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-nutrition-row',
  templateUrl: './nutrition-row.component.html',
  styleUrls: [
    './nutrition-row.component.css',
    './../../../../manage-class.component.css'
  ]
})
export class NutritionRowComponent implements OnInit {
  @Input() nutrition;
  public nutritionInfo;
  @Output() isRefresh = new EventEmitter<boolean>();
  constructor(
    private youtubeService: YoutubeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.youtubeService.getVideoInfo(this.nutrition.link).subscribe(data => {
      // console.log(data);
      this.nutritionInfo = data;
      console.log(this.nutritionInfo);
    });
  }
  removeLink() {
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: 'Cảnh báo!',
        message: 'Bạn có muốn xoá video này?',
        confirm: 'Xác nhận'
      },
      panelClass: 'alert-bg'
    });

    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.youtubeService
          .deleteLinkNutrition(this.nutrition.id)
          .subscribe((result: Result) => {
            if (result.success) {
              this.snackBar.open('Xóa video thành công!', 'Đóng', {
                duration: 6000
              });
              this.isRefresh.emit(true);
            }
          });
      }
    });
  }
}
