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
import { Date } from 'src/app/share/models/date';

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
  public FinalExercises: Exercise[] = [];
  public currentLesson: Lesson = new Lesson();
  public currentSchedule: Schedule = new Schedule();
  public currentTeam: Class = new Class();
  public currentFinalExercise: Exercise = new Exercise();
  public subDefaultSchedule: any;
  public currentScheduledDate: NgbDateStruct;
  public currentDateValue: any;
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
    // this.getListSchedule();
    // this.testAddRecord();
    // this.getListLesson();
    this.getDefaultSchedule();
    this.currentScheduledDate = this.calendar.getToday();
    // console.log('default lesson');
    this.getDefaultLesson();
  }
  ngOnDestroy() {
    if (this.subSchedule !== null) {
      // this.subSchedule.unsubscribe();
    }
  }
  onChangeDate($event) {
    // console.log($event);
    this.getListLesson($event);
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
        // console.log(this.schedules);
      });
  }
  getListLesson(date: Date) {
    this.lessonService.getLessonByDateCoach(date).subscribe((data: Result) => {
      this.lessons = data.values;
      console.log(data.values);
      if (this.lessons !== []) {
        this.currentLesson = this.lessons[0];
      }
      // change final set follows current
      this.onChangeLesson(this.currentLesson);
      // console.log(this.currentLesson);
      this.lessonService
        .getScheduleByDateLesson(
          date.day,
          date.month,
          date.year,
          this.currentLesson.id
        )
        .subscribe((result: Result) => {
          const get_team_id = result.values.team_id;
          this.teamService
            .getMemberByTeam(get_team_id)
            .subscribe((team_result: Result) => {
              // console.log(team_result);
              this.members = team_result.values;
            });
        });
    });
  }
  onChangeSchedule(schedule: Schedule) {
    this.currentSchedule = schedule;
    // console.log(this.currentSchedule.team_id);
    this.recordService.getRecord().subscribe((data: Result) => {
      // console.log('getRecord');
      // console.log(data.values);
    });
  }
  onChangeLesson(lesson: Lesson) {
    this.currentLesson = lesson;
    if (lesson !== undefined) {
      this.lessonService
        .getFinalExerciseByLessonID(lesson.id)
        .subscribe((data: Result) => {
          // console.log(data.values);
          this.FinalExercises = data.values;
          if (this.FinalExercises !== []) {
            this.currentFinalExercise = this.FinalExercises[0];
          }
        });
    }
    if (lesson === undefined) {
      this.FinalExercises = [];
      this.currentFinalExercise = null;
    }
  }
  onChangeFinalSet(finalExercise: Exercise) {
    this.currentFinalExercise = finalExercise;
  }
  getDefaultLesson() {
    this.lessonService
      .getLessonByDateCoach(this.calendar.getToday())
      .subscribe((data: Result) => {
        this.lessons = data.values;
        console.log(data.values);
      });
  }
  getDefaultSchedule() {
    this.subDefaultSchedule = this.scheduleService
      .getDefaultScheduleByCurrentDate()
      .subscribe((data: Result) => {
        // console.log(data.value);
        this.currentDateValue = data.value;
        this.currentLesson.coach_id = this.currentDateValue.coach_id;
        this.currentLesson.id = this.currentDateValue.coach_id;
        this.currentLesson.name = this.currentDateValue.lesson_name;
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
    record.schedule_id = '2';
    record.user_id = '10';
    record.time_swim = 14;
    record.errors = 'thực hiện lỗi';
    record.result = 'good';
    record.note = ' aaaaaannnnnncccccccc';
    record.attitude = ' khá tốt ';

    this.addRecord(record);
  }
}
