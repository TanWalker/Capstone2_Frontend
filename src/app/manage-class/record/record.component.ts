import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ScheduleService } from 'src/app/share/services/schedule.service';
import { Result } from 'src/app/share/models/result';
import { Schedule } from 'src/app/share/models/schedule';
import * as _ from 'lodash';
import { Class } from 'src/app/share/models/class';
import { Exercise } from 'src/app/share/models/exercise';
import { Record } from 'src/app/share/models/record';
import { RecordService } from 'src/app/share/services/record.service';
import { LessonService } from 'src/app/share/services/lesson.service';

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
  public subDefaultSchedule: any;
  constructor(
    private deviceService: DeviceDetectorService,
    private scheduleService: ScheduleService,
    private lessonService: LessonService,
    private recordService: RecordService
  ) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
    this.getListSchedule();
    // this.getDefaultSchedule();
    this.testAddRecord();
    this.getListLesson();
  }
  ngOnDestroy() {
    if (this.subSchedule !== null) {
      this.subSchedule.unsubscribe();
    }
  }
  getListSchedule() {
    this.subSchedule = this.scheduleService
      .getScheduleByCoach()
      .subscribe((data: Result) => {
        this.schedules = data.success ? data.values : [];
        this.schedules = _.orderBy(this.schedules, ['time_start'], ['desc']);
        if (this.schedules !== []) {
          this.currentSchedule = this.schedules[0];
          this.currentTeam.id = this.schedules[0].team_id;
          this.currentTeam.name = this.schedules[0].team_name;
        }
      });
  }
  getListLesson() {
    this.lessonService.getLessonByCoach().subscribe((data: Result) => {
      console.log(data.values);
    });
  }
  onChangeSchedule(schedule: Schedule) {
    console.log(schedule);
  }
  getDefaultSchedule() {
    this.subDefaultSchedule = this.scheduleService
      .getDefaultScheduleByCurrentDate()
      .subscribe((data: Result) => {
        console.log(data);
      });
  }
  addRecord(record: Record) {
    this.recordService.addRecord(record).subscribe((res: Result) => {
      console.log(res);
    });
  }
  testAddRecord() {
    const record = new Record();
    record.min_hr = 60;
    record.max_hr = 80;
    record.min_time = 12.4;
    record.max_time = 15.6;
    record.heart_rate = 65;
    record.exercise_id = '14';
    record.schedule_id = '1';
    record.user_id = '10';
    record.time_swim = 14;
    record.errors = 'thực hiện lỗi';
    record.result = 'good';
    record.note = ' aaaaaannnnnncccccccc';
    record.attitude = ' khá tốt ';

    this.addRecord(record);
  }
}
