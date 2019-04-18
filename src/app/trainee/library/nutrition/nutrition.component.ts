import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  public youtubeLinks;
  public isMobile;
  public newVideos = [];
  constructor(
    private youtubeService: YoutubeService,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.youtubeService.getLinkNutrition().subscribe((data: Result) => {
      if (data.success) {
        this.youtubeLinks = data.values;
      }
    });
  }
}
