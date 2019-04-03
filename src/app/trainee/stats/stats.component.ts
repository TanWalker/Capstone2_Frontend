import { Component, OnInit } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { yearsPerPage } from '@angular/material/datepicker/typings/multi-year-view';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public barChartLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug'
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {
      data: [
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum()
      ],
      label: 'Series B'
    },
    {
      data: [
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum()
      ],
      label: 'Series C',
      yAxisID: 'y-axis-1'
    }
  ];
  public barChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left'
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)'
          },
          ticks: {
            fontColor: 'red'
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        }
      ]
    }
  };
  public barChartColors: Color[] = [
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public months: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years: Number[] = [];
  public i: number;
  public isFilterbyYearOnly = false;
  public dateTypeOption = 1;
  public month: Number;
  public year: Number;
  public yearOnly: Number;
  constructor(private calendar: NgbCalendar) {}

  ngOnInit() {
    // spawn an array of years
    for (this.i = 2000; this.i <= this.calendar.getToday().year; this.i++) {
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
    console.log(event, active);
  }
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
  public randomNum() {
    return Math.floor(Math.random() * 1000) + 1;
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
}
