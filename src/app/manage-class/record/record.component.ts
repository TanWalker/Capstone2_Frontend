import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ScheduleService } from 'src/app/share/services/schedule.service';
import { Result } from 'src/app/share/models/result';
import { Schedule } from 'src/app/share/models/schedule';
import * as _ from 'lodash';
import { Class } from 'src/app/share/models/class';
import { Exercise } from 'src/app/share/models/exercise';
import { RecordService } from 'src/app/share/services/record.service';
import { LessonService } from 'src/app/share/services/lesson.service';
import { TeamService } from 'src/app/share/services/team.service';
import { Member } from 'src/app/share/models/member';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Date } from 'src/app/share/models/date';
import { NotificationService } from 'src/app/share/services/notification.service';
import { Constants } from 'src/app/share/constants';
import { MatDialog } from '@angular/material';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { isNullOrUndefined } from 'util';

const message = {
  box: {
    title: Constants.box.add_record.title,
    message: Constants.box.add_record.message,
    confirm: Constants.box.add_record.confirm
  },
  error: {},
  message: {
    haventSchedule: Constants.message.manage_record.have_not_schedule
  }
};
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
  // message
  public message = message;
  public isHaventSchedule = false;
  // sub variable
  public subSchedule: any;
  public subDefaultSchedule: any;
  public subSchedules: any;
  public subFinalExercises: any;
  public subMember: any;
  public subLessonService: any;
  // current variable
  public currentSchedule: Schedule = new Schedule();
  public currentTeam: Class = new Class();
  public currentFinalExercise: Exercise = new Exercise();
  public currentScheduledDate: NgbDateStruct;
  public currentDateValue: any;
  public selectedDate: Date = new Date();
  // main variable
  public isMobile = false;
  public schedules: Schedule[] = [];
  public members: Member[] = [];
  public FinalExercises: Exercise[] = [];

  constructor(
    public deviceService: DeviceDetectorService,
    private scheduleService: ScheduleService,
    private lessonService: LessonService,
    private recordService: RecordService,
    private teamService: TeamService,
    private calendar: NgbCalendar,
    private dialog: MatDialog,
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
    if (this.subDefaultSchedule !== null) {
      this.subDefaultSchedule.unsubscribe();
    }
    if (this.subSchedules !== null) {
      this.subSchedules.unsubscribe();
    }
    if (this.subFinalExercises !== null) {
      this.subFinalExercises.unsubscribe();
    }
    if (!isNullOrUndefined(this.subMember)) {
      this.subMember.unsubscribe();
    }
  }

  onChangeSchedule(schedule: Schedule) {
    this.currentSchedule = schedule;
    this.getListFinalExerciseByLessonID(this.currentSchedule.lesson_id);
  }
  onChangeFinalSet(finalExercise: Exercise) {
    this.currentFinalExercise = finalExercise;
    this.getListMember();
  }

  onChangeDate($event) {
    this.getListScheduleByDate($event);
    this.selectedDate = $event;
  }
  // list lesson
  getListScheduleByDate(date: Date, isDefault: boolean = false) {
    this.subSchedules = this.scheduleService
      .getScheduleByDate(date)
      .subscribe((data: Result) => {
        if (data.success) {
          // hidden message haven't schedule
          this.isHaventSchedule = false;
          // assign data
          this.schedules = data.values;
          // console.log(data);
          // tslint:disable-next-line:no-unused-expression
          !isDefault ? (this.currentSchedule = this.schedules[0]) : 0;
          // tslint:disable-next-line:no-unused-expression
          !isDefault
            ? this.getListFinalExerciseByLessonID(
                this.currentSchedule.lesson_id
              )
            : 0;
        } else {
          // if we dont have team for this schedule we will reset it
          this.members = [];
          this.FinalExercises = [];
          this.schedules = [];
          this.isHaventSchedule = true;
          this.currentFinalExercise = null;
          this.currentSchedule = null;
        }
      });
  }
  // list final exercise
  getListFinalExerciseByLessonID(lessonID: String) {
    this.subFinalExercises = this.lessonService
      .getFinalExerciseByLessonID(lessonID)
      .subscribe((data: Result) => {
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
    this.subMember = this.teamService
      .getMemberByTeam(this.currentSchedule.team_id)
      .subscribe((data: Result) => {
        this.members = data.success ? data.values : [];
        this.notificationService.destroySubject();
        // console.log(this.members);
      });
  }
  // default lesson
  getDefaultSchedule() {
    this.subDefaultSchedule = this.scheduleService
      .getDefaultScheduleByCurrentDate()
      .subscribe((data: Result) => {
        this.currentSchedule = data.success ? data.value : '';
        this.getListFinalExerciseByLessonID(this.currentSchedule.lesson_id);
      });
  }
  fireNotification() {
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      },
      panelClass: 'alert-bg'
    });
    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.notificationService.fireEvent();
        // console.log('xong');
      }
    });
  }
}
