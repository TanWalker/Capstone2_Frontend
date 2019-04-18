import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddNutritionComponent } from './dialogs/add-nutrition/add-nutrition.component';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: [
    './nutrition.component.css',
    './../../manage-class.component.css',
    './../../../app.component.css'
  ]
})
export class NutritionComponent implements OnInit {
  public nutritions = [];
  constructor(
    private dialog: MatDialog,
    private youtubeService: YoutubeService
  ) {}

  ngOnInit() {
    this.getNutrition();
  }
  openDialogAddVideo() {
    const dialogRef = this.dialog.open(AddNutritionComponent, {
      disableClose: true,
      maxWidth: '300px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getNutrition();
      }
      console.log(res);
    });
  }
  getNutrition() {
    this.youtubeService.getLinkNutrition().subscribe((result: Result) => {
      if (result.success) {
        this.nutritions = result.values;
      }
      if (!result.success) {
        this.nutritions = [];
      }
    });
  }
  refreshLinks($event) {
    // console.log($event);
    if ($event) {
      setTimeout(() => {
        this.getNutrition();
      }, 50);
    }
  }
}
