import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/share/models/result';
import { TeamService } from 'src/app/share/services/team.service';
import { Class } from 'src/app/share/models/class';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Exercise } from 'src/app/share/models/exercise';

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
  public startTime = {};
  public endTime = {};
  public dateModel: NgbDateStruct;
  public currentScheduledDate: NgbDateStruct;
  public teams: Class[] = [];
  public exercises: Exercise[] = [];
  public currentTeam;
  public currentExercise;

  constructor(
    private dialogRef: MatDialogRef<DetailScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private calendar: NgbCalendar,
    private teamService: TeamService,
    private exerciseService: ExerciseService
  ) {
    console.log(data.schedule);
  }

  ngOnInit() {
    this.dateModel = this.calendar.getToday();
    this.getTeams();
    this.getExercises();
    console.log(this.data);
    this.currentTeam = this.data.schedule.title;
    this.currentExercise = this.data.schedule.id;
    this.currentScheduledDate = this.calendar.getToday();
    this.currentScheduledDate.day = this.data.schedule.start.getDate();
    this.currentScheduledDate.month = this.data.schedule.start.getMonth() + 1;
    this.currentScheduledDate.year = this.data.schedule.start.getFullYear();
    this.startTime = {hour: this.data.schedule.start.getHours(), minute: this.data.schedule.start.getMinutes()};
    this.endTime = {hour: this.data.schedule.end.getHours(), minute: this.data.schedule.end.getMinutes()};
    // console.log(this.data.schedule.start.getHours());
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
