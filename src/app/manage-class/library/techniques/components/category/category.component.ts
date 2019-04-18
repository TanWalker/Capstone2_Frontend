import { Component, OnInit, Input } from '@angular/core';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css', './../../../../../app.component.css']
})
export class CategoryComponent implements OnInit {
  public style_id: String;
  @Input() swimStyle: SwimStyle;
  public youtubeLinks;
  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    this.getLinks();
  }
  getLinks() {
    this.youtubeService
      .getYoutubeByStyleId(this.swimStyle.id)
      .subscribe((data: Result) => {
        if (data.success) {
          this.youtubeLinks = data.values;
        }
        if (!data.success) {
          this.youtubeLinks = [];
        }
      });
  }
  refreshLinks($event) {
    // console.log($event);
    if ($event) {
      setTimeout(() => {
        this.getLinks();
      }, 50);
    }
  }
}
