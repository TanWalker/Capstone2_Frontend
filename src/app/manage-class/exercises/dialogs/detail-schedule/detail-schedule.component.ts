import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatDialog
} from '@angular/material';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/share/models/result';
import { TeamService } from 'src/app/share/services/team.service';
import { Class } from 'src/app/share/models/class';
import { Schedule } from 'src/app/share/models/schedule';
import { ScheduleService } from 'src/app/share/services/schedule.service';
import { Lesson } from 'src/app/share/models/lesson';
import { LessonService } from 'src/app/share/services/lesson.service';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Constants } from 'src/app/share/constants';
import { I18n, DatepickerFormat } from 'src/app/manage-class/record/datepicker-format.provider';

const message = {
  box: {
    title: Constants.box.update_detail_schedule.title,
    message: Constants.box.update_detail_schedule.message,
    confirm: Constants.box.update_detail_schedule.confirm
  },
  error: Constants.error.create_lesson_plan.name,
  snackBar: {
    success: Constants.snackBar.update_detail_schedule.success,
    fail: Constants.snackBar.update_detail_schedule.fail,
    title: Constants.snackBar.update_detail_schedule.title
  },
  snackBarDelete: {
    success: Constants.snackBar.delete_detail_schedule.success,
    fail: Constants.snackBar.delete_detail_schedule.fail,
    title: Constants.snackBar.delete_detail_schedule.title
  },
  deleteBox: {
    title: Constants.box.delete_schedule_box.title,
    message: Constants.box.delete_schedule_box.message,
    confirm: Constants.box.delete_schedule_box.confirm
  }
};
@Component({
  selector: 'app-detail-schedule',
  templateUrl: './detail-schedule.component.html',
  styleUrls: [
    './detail-schedule.component.css',
    '../../../../app.component.css',
    '../../../manage-class.component.css'
  ],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: DatepickerFormat }] // define custom NgbDatepickerI18n provider
})
export class DetailScheduleComponent implements OnInit {
  public startTime = { hour: null, minute: null };
  public endTime = { hour: null, minute: null };
  public currentScheduledDate: NgbDateStruct;
  public teams: Class[] = [];
  public subTeam: any;
  public subLessons: any;
  public Lessons: Lesson[] = [];
  public currentTeam: Class = new Class();
  public currentLesson: Lesson = new Lesson();
  public schedule: Schedule = new Schedule();
  public message = message;
  constructor(
    private dialogRef: MatDialogRef<DetailScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendar: NgbCalendar,
    private teamService: TeamService,
    private lessonService: LessonService,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getTeams();
    this.getlessons();

    // setup data
    // current lesson
    this.currentLesson.id = this.data.schedule.meta.lesson_id;
    this.currentLesson.name = this.data.schedule.meta.lesson_name;

    this.currentScheduledDate = this.calendar.getToday();
    this.currentScheduledDate.day = this.data.schedule.start.getDate();
    this.currentScheduledDate.month = this.data.schedule.start.getMonth() + 1;
    this.currentScheduledDate.year = this.data.schedule.start.getFullYear();
    this.startTime = {
      hour: this.data.schedule.start.getHours(),
      minute: this.data.schedule.start.getMinutes()
    };
    this.endTime = {
      hour: this.data.schedule.end.getHours(),
      minute: this.data.schedule.end.getMinutes()
    };
    // console.log(this.data);
  }
  saveSchedule() {
    // init value
    // console.log(this.currentTeam);
    this.schedule.id = this.data.schedule.meta.id;
    this.schedule.lesson_id = this.currentLesson.id;
    this.schedule.lesson_name = this.currentLesson.name;

    this.schedule.team_name = this.currentTeam.name;
    this.schedule.team_id = this.currentTeam.id;

    this.schedule.year = this.currentScheduledDate.year;
    this.schedule.month = this.currentScheduledDate.month;
    this.schedule.day = this.currentScheduledDate.day;
    this.schedule.start_hour = this.startTime.hour;
    this.schedule.start_minute = this.startTime.minute;
    this.schedule.end_hour = this.endTime.hour;
    this.schedule.end_minute = this.endTime.minute;
    this.scheduleService
      .updateSchedule(this.schedule)
      .subscribe((result: Result) => {
        if (result.success) {
          // console.log(result);
          this.dialogRef.close(true);
          this.snackBar.open(
            this.message.snackBar.success,
            this.message.snackBar.title,
            {
              duration: 6000
            }
          );
        } else {
          this.snackBar.open(
            this.message.snackBar.fail,
            this.message.snackBar.title,
            {
              duration: 3000
            }
          );
        }
      });
  }

  openConfirmBox() {
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
        this.saveSchedule();
      }
    });
  }
  getTeams() {
    this.subTeam = this.teamService
      .getTeamByCoach()
      .subscribe((data: Result) => {
        this.teams = data.success ? data.values : [];

        const index = this.teams.findIndex(
          x => x.id === this.data.schedule.meta.team_id
        );
        this.currentTeam = this.teams[index];
        // console.log(this.currentTeam);
      });
  }
  getlessons() {
    this.subLessons = this.lessonService
      .getLessonByCoach()
      .subscribe((data: Result) => {
        // console.log(data);
        this.Lessons = data.success ? data.values : [];
      });
  }

  clearSchedule() {
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.deleteBox.title,
        message: this.message.deleteBox.message,
        confirm: this.message.deleteBox.confirm
      },
      panelClass: 'alert-bg'
    });
    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.scheduleService
          .deleteSchedule(this.data.schedule.meta.id)
          .subscribe((response: Result) => {
            // console.log(this.data.schedule.meta.id);
            if (response.success) {
              this.dialogRef.close(true);
              this.snackBar.open(
                this.message.snackBarDelete.success,
                this.message.snackBarDelete.title,
                {
                  duration: 6000
                }
              );
            } else {
              this.dialogRef.close(false);
              this.snackBar.open(
                this.message.snackBarDelete.fail,
                this.message.snackBarDelete.title,
                {
                  duration: 3000
                }
              );
            }
          });
      }
    });
  }
}
