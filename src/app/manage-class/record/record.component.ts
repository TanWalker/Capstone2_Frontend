import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ScheduleService } from 'src/app/share/services/schedule.service';
import { Result } from 'src/app/share/models/result';
import { Schedule } from 'src/app/share/models/schedule';
import * as _ from 'lodash';
import { Class } from 'src/app/share/models/class';
import { Exercise } from 'src/app/share/models/exercise';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: [
    './record.component.css',
    './../manage-class.component.css',
    './../../app.component.css'
  ]
})
export class RecordComponent implements OnInit, OnDestroy {

  public isMobile = false;
  public subSchedule: any;
  public schedules: Schedule[] = [];
  public currentSchedule: Schedule = new Schedule();
  public currentTeam: Class = new Class();
  public currentExercise: Exercise = new Exercise();
  constructor(
    public deviceService: DeviceDetectorService,
    private scheduleService: ScheduleService
  ) {
    this.isMobile = deviceService.isMobile();
   }

  ngOnInit() {
    // this.getListSchedule();
  }
  ngOnDestroy() {
    if ( this.subSchedule !== null) {this.subSchedule.unsubscribe(); }
  }
  getListSchedule() {
    this.subSchedule = this.scheduleService.getScheduleByCoach().subscribe(
      (data: Result) => {
        this.schedules = data.success ? data.values : [];
        this.schedules = _.orderBy(this.schedules,  ['time_start'], ['desc']);
        if ( this.schedules !== []) {
          this.currentSchedule = this.schedules[0];
          this.currentTeam.id = this.schedules[0].team_id;
          this.currentTeam.name = this.schedules[0].team_name;
        }
      }
    );
  }
  onChangeSchedule(schedule: Schedule) {

  }
}
