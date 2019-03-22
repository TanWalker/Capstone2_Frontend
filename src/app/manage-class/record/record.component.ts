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
import { Lesson } from 'src/app/share/models/lesson';
import { TeamService } from 'src/app/share/services/team.service';
import { Member } from 'src/app/share/models/member';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

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
  public lessons: Lesson[] = [];
  public members: Member[] = [];
  public currentLesson: Lesson = new Lesson();
  public currentSchedule: Schedule = new Schedule();
  public currentTeam: Class = new Class();
  public currentExercise: Exercise = new Exercise();
  public subDefaultSchedule: any;
  public currentScheduledDate: NgbDateStruct;
  constructor(
    private deviceService: DeviceDetectorService,
    private scheduleService: ScheduleService,
    private lessonService: LessonService,
    private recordService: RecordService,
    private teamService: TeamService,
    private calendar: NgbCalendar
  ) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
    this.getListSchedule();
    // this.getDefaultSchedule();
    // this.testAddRecord();
    this.getListLesson();
    this.currentScheduledDate = this.calendar.getToday();
  }
  ngOnDestroy() {
    if (this.subSchedule !== null) {
      this.subSchedule.unsubscribe();
    }
  }
  printout($event) {
    console.log($event);
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
        console.log(this.schedules);
      });
  }
  getListLesson() {
    this.lessonService.getLessonByCoach().subscribe((data: Result) => {
      this.lessons = data.success ? data.values : [];
      if (this.lessons !== []) {
        this.currentLesson = this.lessons[0];
      }
      console.log(this.lessons);
    });
  }
  onChangeSchedule(schedule: Schedule) {
    this.currentSchedule = schedule;
    // console.log(this.currentSchedule.team_id);
    this.teamService
      .getMemberByTeam(schedule.team_id)
      .subscribe((data: Result) => {
        // console.log(data.values);
        this.members = data.values;
      });
    this.recordService.getRecord().subscribe((data: Result) => {
      console.log(data.values);
    });
  }
  onChangeLesson(lesson: Lesson) {
    this.currentLesson = lesson;
  }
  getDefaultSchedule() {
    this.subDefaultSchedule = this.scheduleService
      .getDefaultScheduleByCurrentDate()
      .subscribe((data: Result) => {
        // console.log(data);
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
