import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/share/services/schedule.service';
import { Result } from 'src/app/share/models/result';
import { CalendarEvent } from 'calendar-utils';
import { Schedule } from 'src/app/share/models/schedule';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
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
  selector: 'app-trainee-schedule',
  templateUrl: './trainee-schedule.component.html',
  styleUrls: ['./trainee-schedule.component.css']
})
export class TraineeScheduleComponent implements OnInit {
  public viewDate: Date = new Date();
  public events: CalendarEvent[] = [];
  public schedule: Schedule[] = [];
  public subEvents: any;
  public isMobile;
  refresh: Subject<any> = new Subject();
  constructor(
    private scheduleService: ScheduleService,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {
    this.getEvent();
    this.isMobile = this.deviceService.isMobile();
  }
  handleEvent(action: string, event: CalendarEvent): void {

  }
  getEvent() {
    this.scheduleService.getScheduleByTeam().subscribe((data: Result) => {
      this.schedule = data.success ? data.values : [];
      this.schedule.map(event => {
        this.events.push({
          title: event.team_name.toString() + ' - ' + event.lesson_name,
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
          id: event.id.toString(),
          meta: event
        });
        // console.log(this.events);
      });
      this.refresh.next();
    });
  }
}
