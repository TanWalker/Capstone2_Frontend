import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

import { AddClassComponent } from 'src/app/manage-class/dialogs/add-class/add-class.component';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Exercise } from 'src/app/share/models/exercise';
import { Result } from 'src/app/share/models/result';
import { Class } from 'src/app/share/models/class';
import { TeamService } from 'src/app/share/services/team.service';
import { Constants } from 'src/app/share/constants';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { ScheduleService } from 'src/app/share/services/schedule.service';
import { Schedule } from 'src/app/share/models/schedule';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

const message = {
  box: {
    title: Constants.box.create_schedule.title,
    message: Constants.box.create_schedule.message,
    confirm: Constants.box.create_schedule.confirm
  }
};
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: [
    './add-schedule.component.css',
    '../../../../app.component.css',
    '../../../manage-class.component.css'
  ]
})
export class AddScheduleComponent implements OnInit, OnDestroy {
  public message = message;
  public startTime = { hour: 8, minute: 0 };
  public endTime = { hour: 9, minute: 0 };
  public subExercise: any;
  public exercises: Exercise[] = [];
  public subTeam: any;
  public teams: Class[] = [];
  public subCreate: any;
  public schedule: Schedule = new Schedule();
  public dateModel: NgbDateStruct;
  constructor(
    private dialogRef: MatDialogRef<AddClassComponent>,
    private exerciseService: ExerciseService,
    private teamService: TeamService,
    private scheduleService: ScheduleService,
    private dialog: MatDialog,
    private calendar: NgbCalendar
  ) {}
  ngOnInit() {
    this.getExercises();
    this.getTeams();
    // set date
    this.dateModel = this.calendar.getToday();
  }
  ngOnDestroy() {
    if (this.subExercise !== null) {
      this.subExercise.unsubscribe();
    }
    if (this.subTeam !== null) {
      this.subTeam.unsubscribe();
    }
  }
  getExercises() {
    this.subExercise = this.exerciseService.getExerciseByCoach().subscribe(
      (data: Result) => {
       this.exercises = data.success ? data.values : [];
       if ( this.exercises !== []) {
        this.schedule.exercise_id = this.exercises[0].id;
        this.schedule.exercise_name = this.exercises[0].name;
      }
      }
    );
  }
  getTeams() {
    this.subTeam = this.teamService.getTeamByCoach().subscribe(
      (data: Result) => {
        this.teams = data.success ? data.values : [];
        if ( this.teams !== []) {
          this.schedule.team_id = this.teams[0].id;
          this.schedule.team_name = this.teams[0].name;
        }
      }
    );
  }
  openMessageBox() {
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
        // init value
        this.schedule.year = this.dateModel.year;
        this.schedule.month = this.dateModel.month;
        this.schedule.day = this.dateModel.day;
        this.schedule.start_hour = this.startTime.hour;
        this.schedule.start_minute = this.startTime.minute;
        this.schedule.end_hour = this.endTime.hour;
        this.schedule.end_minute = this.endTime.minute;
        // add schedule

        this.subCreate = this.scheduleService.addSchedule(this.schedule).subscribe(
          (result: Result) => {
            console.log(result);
            result.success ? this.dialogRef.close(true) : console.log('create schedule fail');
          }
        );
      }
    });
  }
  onChangeTeam(name) {
    this.schedule.team_name = name;
  }
}
