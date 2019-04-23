import { Component, OnInit, Input } from '@angular/core';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.css']
})
export class YoutubeVideoComponent implements OnInit {
  @Input() youtubeLink: String;
  public youtubeInfo;
  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    this.youtubeService.getVideoInfo(this.youtubeLink).subscribe((data: Result) => {
      if (data.success) {
        this.youtubeInfo = data.value;
      }
    });
  }
}
