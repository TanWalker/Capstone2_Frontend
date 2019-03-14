import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

import { MatDialog } from '@angular/material';
import { ScheduleService } from 'src/app/share/services/schedule.service';
import { Result } from 'src/app/share/models/result';
import { Schedule } from 'src/app/share/models/schedule';
import { Subject } from 'rxjs';
import { AddScheduleComponent } from '../dialogs/add-schedule/add-schedule.component';
import { DetailScheduleComponent } from '../dialogs/detail-schedule/detail-schedule.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public viewDate: Date = new Date();
  public events: CalendarEvent[] = [];
  public schedule: Schedule[] = [];

  public subEvents: any;
  refresh: Subject<any> = new Subject();

  constructor(
    private scheduleService: ScheduleService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEvent();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);
    const dialogRef = this.dialog.open(DetailScheduleComponent, {
      disableClose: true,
      maxWidth: '600px',
      data: {
        schedule: event
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // this.isRefresh.emit(true);
      }
    });
  }
  openScheduleBox(): void {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      disableClose: true,
      maxWidth: '334px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // reset events
        this.events = [];
        this.getEvent();
      }
    });
  }
  getEvent() {
    this.subEvents = this.scheduleService
      .getScheduleByCoach()
      .subscribe((data: Result) => {
        this.schedule = data.success ? data.values : [];
        this.schedule.map(event => {
          this.events.push({
            title: event.team_name,
            start: new Date(
              event.year,
              event.month - 1,
              event.day,
              event.start_hour,
              event.start_minute
            ),
            end: new Date(
              event.year,
              event.month - 1,
              event.day,
              event.end_hour,
              event.end_minute
            ),
            color: colors.blue,
            id: event.exercise_id
          });
        });
        this.refresh.next();
      });
  }
}
