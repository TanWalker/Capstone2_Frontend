import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AddVideoComponent } from '../dialogs/add-video/add-video.component';
import { MatDialog } from '@angular/material';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: [
    './techniques.component.css',
    './../../manage-class.component.css',
    './../../../app.component.css'
  ]
})
export class TechniquesComponent implements OnInit, AfterViewInit {
  public swimStyles = [];
  public isMobile;
  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {
    this.getCategory();
    this.isMobile = this.deviceService.isMobile();
  }
  ngAfterViewInit() {
    console.log('done load youtube');
  }
  print() {
    console.log(this.swimStyles.length);
  }
  openDialogAddVideo() {
    const dialogRef = this.dialog.open(AddVideoComponent, {
      disableClose: true,
      maxWidth: '300px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getCategory();
      }
      console.log(res);
    });
  }
  getCategory() {
    this.exerciseService.getAllStyle().subscribe((data: Result) => {
      if (data.success) {
        this.swimStyles = data.values;
      }
    });
  }
}
