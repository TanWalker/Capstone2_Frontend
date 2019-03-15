import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSnackBar
} from '@angular/material';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/share/models/result';
import { TeamService } from 'src/app/share/services/team.service';
import { Class } from 'src/app/share/models/class';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Exercise } from 'src/app/share/models/exercise';
import { Schedule } from 'src/app/share/models/schedule';
import { ScheduleService } from 'src/app/share/services/schedule.service';

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
  public exercises: Exercise[] = [];
  public currentTeam;
  public currentExercise;
  public schedule: Schedule = new Schedule();
  constructor(
    private dialogRef: MatDialogRef<DetailScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private calendar: NgbCalendar,
    private teamService: TeamService,
    private exerciseService: ExerciseService,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar
  ) {
    console.log(data.schedule);
  }

  ngOnInit() {
    this.getTeams();
    this.getExercises();
    console.log(this.data);
    this.currentTeam = this.data.schedule.title;
    this.currentExercise = this.data.schedule.id;
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
    // console.log(this.data.schedule.start.getHours());
  }
  saveSchedule() {
    // init value
    this.schedule.exercise_id = this.currentExercise;
    this.schedule.team_name = this.currentTeam;
    this.schedule.year = this.currentScheduledDate.year;
    this.schedule.month = this.currentScheduledDate.month;
    this.schedule.day = this.currentScheduledDate.day;
    this.schedule.start_hour = this.startTime.hour;
    this.schedule.start_minute = this.startTime.minute;
    this.schedule.end_hour = this.endTime.hour;
    this.schedule.end_minute = this.endTime.minute;
    console.log(this.schedule);
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
          console.log(result);
        }
      });
  }
  getTeams() {
    this.teamService.getTeamByCoach().subscribe((data: Result) => {
      // console.log(data);
      this.teams = data.success ? data.values : [];
    });
  }
  getExercises() {
    this.exerciseService.getExerciseByCoach().subscribe((data: Result) => {
      // console.log(data);
      this.exercises = data.success ? data.values : [];
    });
  }
}
