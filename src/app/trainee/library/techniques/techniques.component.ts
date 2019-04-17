import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { Result } from 'src/app/share/models/result';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from 'src/app/share/services/auth.service';
import { AddVideoComponent } from '../../../manage-class/library/dialogs/add-video/add-video.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.css']
})
export class TechniquesComponent implements OnInit {
  public count;
  public color: String;
  public randColor: String = '';
  public swimStyles: SwimStyle[] = [];
  public isMobile;
  public colors = [
    'Blue ',
    'Green',
    'Red',
    'Orange',
    'Violet',
    'Indigo',
    'DarkSalmon ',
    'DarkSeaGreen ',
    'DarkSlateBlue ',
    'DeepPink ',
    'DeepSkyBlue ',
    'DimGray '
  ];
  public newVideos;
  constructor(
    private exerciseService: ExerciseService,
    private deviceService: DeviceDetectorService,
    private authService: AuthService,
    private dialog: MatDialog,
    private youtubeService: YoutubeService
  ) {}
  ngOnInit() {
    // check mobile or desktop
    this.isMobile = this.deviceService.isMobile();
    console.log(this.getRandomColor());
    this.randColor = this.getRandomColor();
    this.exerciseService.getAllStyle().subscribe((data: Result) => {
      if (data.success) {
        this.swimStyles = data.values;
      }
    });
    this.getNewVideos();
  }
  getNewVideos() {
    this.youtubeService.getNewLink().subscribe((result: Result) => {
      if (result.success) {
        this.newVideos = result.values;
      }
    });
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    this.color = '#';
    for (this.count = 0; this.count < 6; this.count++) {
      this.color += letters[Math.floor(Math.random() * 16)];
    }
    return this.color;
  }
  openDialogAddVideo(): void {
    const dialogRef = this.dialog.open(AddVideoComponent, {
      disableClose: true,
      maxWidth: '300px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // this.getTeam();
      }
    });
  }
}
