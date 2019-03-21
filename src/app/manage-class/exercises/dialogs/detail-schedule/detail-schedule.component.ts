import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from '@angular/material';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/share/models/result';
import { TeamService } from 'src/app/share/services/team.service';
import { Class } from 'src/app/share/models/class';
import { Schedule } from 'src/app/share/models/schedule';
import { ScheduleService } from 'src/app/share/services/schedule.service';
import { Lesson } from 'src/app/share/models/lesson';
import { LessonService } from 'src/app/share/services/lesson.service';

@Component({
  selector: 'app-detail-schedule',
  templateUrl: './detail-schedule.component.html',
  styleUrls: [
    './detail-schedule.component.css',
    '../../../../app.component.css',
    '../../../manage-class.component.css'
  ]
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
  constructor(
    private dialogRef: MatDialogRef<DetailScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendar: NgbCalendar,
    private teamService: TeamService,
    private lessonService: LessonService,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getTeams();
    this.getlessons();

    // setup data
    // current team
    this.currentTeam.name = this.data.schedule.meta.team_name;
    this.currentTeam.id = this.data.schedule.meta.team_id;

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
     console.log(this.data.schedule);
  }
  saveSchedule() {
    // init value
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
          this.dialogRef.close(true);
          this.snackBar.open('Lưu lịch thành công!', 'Đóng', {
            duration: 6000
          });
        } else {
          console.log('cannot save');
        }
      });
  }
  getTeams() {
   this.subTeam = this.teamService.getTeamByCoach().subscribe((data: Result) => {
      // console.log(data);
      this.teams = data.success ? data.values : [];
    });
  }
  getlessons() {
    this.subLessons = this.lessonService.getLessonByCoach().subscribe((data: Result) => {
      // console.log(data);
      this.Lessons = data.success ? data.values : [];
    });
  }
}
