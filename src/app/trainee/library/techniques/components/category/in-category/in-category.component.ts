import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { Result } from 'src/app/share/models/result';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-in-category',
  templateUrl: './in-category.component.html',
  styleUrls: ['./in-category.component.css']
})
export class InCategoryComponent implements OnInit {
  public idStyle: String;
  public youtubeLinks;
  public isMobile;
  constructor(
    private activatedRoute: ActivatedRoute,
    private youtubeService: YoutubeService,
    private deviceService: DeviceDetectorService
  ) {
    activatedRoute.params.subscribe(params => (this.idStyle = params.id));
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.youtubeService
      .getYoutubeByStyleId(this.idStyle)
      .subscribe((data: Result) => {
        console.log(data);
        if (data.success) {
          this.youtubeLinks = data.values;
        }
      });
  }
}
