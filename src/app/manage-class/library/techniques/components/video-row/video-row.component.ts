import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { Result } from 'src/app/share/models/result';
import { MatDialog } from '@angular/material';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';

@Component({
  selector: 'app-video-row',
  templateUrl: './video-row.component.html',
  styleUrls: [
    './video-row.component.css',
    './../../../../manage-class.component.css'
  ]
})
export class VideoRowComponent implements OnInit {
  @Input() youtubeLink;
  @Input() count;
  @Output() isRefresh = new EventEmitter<boolean>();
  public youtubeInfo;
  constructor(
    private youtubeService: YoutubeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.youtubeService.getVideoInfo(this.youtubeLink.link).subscribe(data => {
      // console.log(data);
      this.youtubeInfo = data;
      // console.log(this.youtubeInfo);
    });
  }
  removeLink() {
    // console.log(this.youtubeLink);
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
          .deleteLink(this.youtubeLink.id)
          .subscribe((result: Result) => {
            // console.log(result);
            this.isRefresh.emit(true);
          });
      }
    });
  }
}
