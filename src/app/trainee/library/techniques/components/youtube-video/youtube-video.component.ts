import { Component, OnInit, Input } from '@angular/core';
import { YoutubeService } from 'src/app/share/services/youtube.service';

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
    this.youtubeService.getVideoInfo(this.youtubeLink).subscribe(data => {
      // console.log(data);
      this.youtubeInfo = data;
    });
  }
}
