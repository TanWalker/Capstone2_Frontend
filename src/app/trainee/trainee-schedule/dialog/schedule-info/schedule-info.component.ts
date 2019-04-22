import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-schedule-info',
  templateUrl: './schedule-info.component.html',
  styleUrls: ['./schedule-info.component.css']
})
export class ScheduleInfoComponent implements OnInit {
  public schedule;
  public exercises;
  constructor(
    private dialogRef: MatDialogRef<ScheduleInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit() {
    this.schedule = this.data.schedule.meta;
    console.log(this.schedule);
    console.log(('0' + 11).slice(-2));
    this.exerciseService
      .getExerciseByLessonID(this.schedule.lesson_id)
      .subscribe((result: Result) => {
        console.log(result);
        if (result.success) {
          this.exercises = result.values;
        }
      });
  }
  convertTwoDigits(value) {
    return ('0' + value).slice(-2);
  }
}
