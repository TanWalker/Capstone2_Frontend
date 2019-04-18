import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { Result } from 'src/app/share/models/result';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { SwimStyle } from 'src/app/share/models/swimStyle';

@Component({
  selector: 'app-in-category',
  templateUrl: './in-category.component.html',
  styleUrls: ['./in-category.component.css']
})
export class InCategoryComponent implements OnInit {
  public idStyle: String;
  public youtubeLinks;
  public isMobile;
  public swimStyle: SwimStyle;
  constructor(
    private activatedRoute: ActivatedRoute,
    private youtubeService: YoutubeService,
    private deviceService: DeviceDetectorService,
    private exerciService: ExerciseService
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
    this.exerciService
      .getStyleById(this.idStyle)
      .subscribe((result: Result) => {
        if (result.success) {
          this.swimStyle = result.value;
        }
      });
  }
}
