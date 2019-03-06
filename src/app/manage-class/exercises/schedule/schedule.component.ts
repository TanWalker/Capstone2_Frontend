import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  setHours,
  setMinutes,
  format
} from 'date-fns';
import { MatDialog } from '@angular/material';


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
  events: CalendarEvent[] = [
    {
      title: 'No event end date',
      start: new Date( 2019 , 2 , 6 , 8 , 0 ),
      end :  new Date( 2019 , 2 , 6 , 10 , 0),
      color: colors.blue,
      meta : 'abc',
      id: '1',
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 14),
      end: setHours(setMinutes(new Date(), 0), 16),

      color: colors.yellow,
      meta : 'abc',
      id: '2',

    }
  ];

  constructor(
  ) { }

  ngOnInit() {
  }

  handleEvent(action: string, event: CalendarEvent): void {
  }
}
