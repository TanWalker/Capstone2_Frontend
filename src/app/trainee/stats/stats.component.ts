import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';
import { RecordService } from 'src/app/share/services/record.service';
import { Result } from 'src/app/share/models/result';
import { Record } from 'src/app/share/models/record';

declare var jQuery: any;
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public months: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years: Number[] = [];
  public i: number;
  public isFilterbyYearOnly = false;
  public dateTypeOption = 1;
  public month: Number;
  public year: Number;
  public yearOnly: Number;
  public isYearOnly: boolean = null;
  public submittedMonth;
  public submittedYear;
  public submittedYearOnly;
  public recordExercises: Record = null;
  constructor(
    private calendar: NgbCalendar,
    private snackBar: MatSnackBar,
    private recordService: RecordService
  ) {}
  ngOnInit() {
    // render bootstrap-select when load page
    jQuery('.selectpicker').selectpicker('render');
    // spawn an array of years
    for (this.i = 2010; this.i <= this.calendar.getToday().year; this.i++) {
      this.years.push(this.i);
    }
  }
  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }

  public selectMonth(event) {
    this.month = event;
    // console.log(event);
  }
  public selectYear(event) {
    this.year = event;
    // console.log(event);
  }
  public selectYearOnly(event) {
    this.yearOnly = event;
    // console.log(event);
  }
  public selectDateType(event) {
    if (event === '2') {
      this.isFilterbyYearOnly = true;
    }
    if (event === '1') {
      this.isFilterbyYearOnly = false;
    }
    // console.log(this.isFilterbyYearOnly);
  }
  public submitDateEx() {
    // console.log(this.recordExercises);
    this.submittedMonth = this.month;
    this.submittedYear = this.year;
    this.submittedYearOnly = this.yearOnly;

    if (this.isFilterbyYearOnly && this.yearOnly !== undefined) {
      this.isYearOnly = true;
      this.recordService
        .getRecordByYearOfCurrentUser(this.submittedYearOnly)
        .subscribe((data: Result) => {
          if (data.success) {
            this.recordExercises = data.values;
          } else {
            this.recordExercises = null;
            // console.log(data.errorMessage);
          }
        });
    }
    if (
      !this.isFilterbyYearOnly &&
      this.year !== undefined &&
      this.month !== undefined
    ) {
      this.isYearOnly = false;
      this.recordService
        .getRecordByMonthYearOfCurrentUser(
          this.submittedMonth,
          this.submittedYear
        )
        .subscribe((data: Result) => {
          if (data.success) {
            this.recordExercises = data.values;
          } else {
            this.recordExercises = null;
            // console.log(data.errorMessage);
          }
        });
    }
    if (
      (!this.isFilterbyYearOnly &&
        this.year === undefined &&
        this.month === undefined) ||
      (!this.isFilterbyYearOnly && this.year === undefined) ||
      (!this.isFilterbyYearOnly && this.month === undefined)
    ) {
      // console.log(this.isFilterbyYearOnly);
      this.snackBar.open('Vui lòng chọn tháng, năm!', 'Đóng', {
        duration: 2000
      });
    }
    if (this.isFilterbyYearOnly && this.yearOnly === undefined) {
      this.snackBar.open('Vui lòng chọn năm!', 'Đóng', {
        duration: 2000
      });
    }
    // console.log(this.isFilterbyYearOnly);
    // console.log(this.yearOnly);
  }
  // currentExerciseInRecordByMonthYear(month, year) {
  //   this.recordService
  //     .getRecordByMonthYearOfCurrentUser(month, year)
  //     .subscribe((data: Result) => {
  //       if (data.success) {
  //         return data.values;
  //       }
  //     });
  // }
}
