import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { AuthService } from 'src/app/share/services/auth.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/share/models/user';
@Component({
  selector: 'app-schedule-info',
  templateUrl: './schedule-info.component.html',
  styleUrls: ['./schedule-info.component.css']
})
export class ScheduleInfoComponent implements OnInit {
  public schedule;
  public exercises;
  public apiUrl;
  public user = new User();
  constructor(
    private dialogRef: MatDialogRef<ScheduleInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exerciseService: ExerciseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.schedule = this.data.schedule.meta;
    // console.log(this.schedule);
    // console.log(('0' + 11).slice(-2));
    this.user = this.authService.currentUser;
    this.apiUrl = environment.urls.api;
    this.exerciseService
      .getExerciseByLessonID(this.schedule.lesson_id)
      .subscribe((result: Result) => {
        // console.log(result);
        if (result.success) {
          this.exercises = result.values;
        }
      });
  }
  convertTwoDigits(value) {
    return ('0' + value).slice(-2);
  }
}
