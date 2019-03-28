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
import { NotificationService } from 'src/app/share/services/notification.service';
import { isNullOrUndefined } from 'util';

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

  // sub variable
  public subSchedule: any;
  public subDefaultSchedule: any;
  public subLessons: any;
  public subFinalExercises: any;
  public subMember: any;
  public subLessonService: any;
  // current variable
  public currentLesson: Lesson = new Lesson();
  public currentSchedule: Schedule = new Schedule();
  public currentTeam: Class = new Class();
  public currentFinalExercise: Exercise = new Exercise();
  public currentScheduledDate: NgbDateStruct;
  public currentDateValue: any;
  public selectedDate: Date = new Date();

  // main variable
  public isMobile = false;
  public schedules: Schedule[] = [];
  public lessons: Lesson[] = [];
  public members: Member[] = [];
  public FinalExercises: Exercise[] = [];

  constructor(
    public deviceService: DeviceDetectorService,
    private scheduleService: ScheduleService,
    private lessonService: LessonService,
    private recordService: RecordService,
    private teamService: TeamService,
    private calendar: NgbCalendar,

    // fire and get notification service
    private notificationService: NotificationService
  ) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
    this.getDefaultSchedule();
    this.getListScheduleByDate(this.calendar.getToday(), true);

    // for default lesson
    this.currentScheduledDate = this.calendar.getToday();
    // for default date
    this.selectedDate = this.calendar.getToday();
  }
  ngOnDestroy() {
    if (this.subDefaultSchedule !== null) { this.subDefaultSchedule.unsubscribe(); }
    if (this.subLessons !== null) { this.subLessons.unsubscribe(); }
    if (this.subFinalExercises !== null) { this.subFinalExercises.unsubscribe(); }
    if (this.subLessonService !== null) { this.subLessonService.unsubscribe(); }
    if (this.subMember !== null) { this.subMember.unsubscribe(); }
  }

  onChangeLesson(lesson: Lesson) {
    this.currentLesson = lesson;
    this.getListFinalExerciseByLessonID(this.currentLesson.id);

  }
  onChangeFinalSet(finalExercise: Exercise) {
     this.currentFinalExercise = finalExercise;
  }

  onChangeDate($event) {
    this.getListScheduleByDate($event);
    this.selectedDate = $event;
  }
  // list lesson
  getListScheduleByDate(date: Date , isDefault: boolean = false) {
     this.subLessons = this.lessonService.getLessonByDateCoach(date).subscribe(
      (data: Result) => {
        this.lessons = data.values;
       // tslint:disable-next-line:no-unused-expression
       !isDefault ? this.currentLesson = this.lessons[0] : 0;
       // tslint:disable-next-line:no-unused-expression
       !isDefault ? this.getListFinalExerciseByLessonID( this.currentLesson.id) : 0;
      }
    );
  }
  // list final exercise
  getListFinalExerciseByLessonID(lessonID: String) {
   this.subFinalExercises = this.lessonService.getFinalExerciseByLessonID(lessonID).subscribe(
     (data: Result) => {
          if (data.success && data.total > 0) {
            this.FinalExercises = data.values;
            this.currentFinalExercise = this.FinalExercises[0];
            // get list member
            this.getListMember();
          }
    });
  }
  // list member
  getListMember() {
   this.subLessonService = this.lessonService.getScheduleByDateLesson(
          this.selectedDate.day,
          this.selectedDate.month,
          this.selectedDate.year,
          this.currentLesson.id
        ).subscribe((result: Result) => {
          this.currentSchedule = result.values;
          const get_team_id = result.values[0].team_id;
          this.subMember = this.teamService.getMemberByTeam(get_team_id).subscribe((team_result: Result) => {
              this.members = team_result.values;
          });
        });
  }
  // default lesson
  getDefaultSchedule() {
    this.subDefaultSchedule = this.scheduleService.getDefaultScheduleByCurrentDate().subscribe(
      (data: Result) => {
        this.currentLesson = data.success ? data.value : '';
        this.getListFinalExerciseByLessonID(this.currentLesson.id);
      }
    );
  }
  fireNotification() {
    this.notificationService.fireEvent();
  }
}
