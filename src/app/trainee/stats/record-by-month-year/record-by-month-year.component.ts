import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { RecordService } from 'src/app/share/services/record.service';
import { Result } from 'src/app/share/models/result';
import { Record } from 'src/app/share/models/record';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-record-by-month-year',
  templateUrl: './record-by-month-year.component.html',
  styleUrls: ['./record-by-month-year.component.css']
})
export class RecordByMonthYearComponent implements OnInit {
  public times = [];
  public heart_rate = [];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {
      data: this.times,
      label: 'Thời gian'
    },
    {
      data: this.heart_rate,
      label: 'Nhịp tim',
      yAxisID: 'y-axis-1'
    }
  ];
  public barChartOptions: ChartOptions & { annotation: any } = {
    // responsive: false,
    maintainAspectRatio: false,
    // maintainAspectRatio: false,
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
  public month: Number;
  public year: Number;
  public exercise_id: Number;
  public records: Record[];
  public teststyle: NgStyle;
  public divStyle;
  public widthChart = 150;
  public count = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private recordService: RecordService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.month = params.month;
      this.year = params.year;
      this.exercise_id = params.exercise_id;
      // console.log(params.month);
    });
  }

  ngOnInit() {
    this.divStyle = 'none';
    this.recordService
      .getListRecordByMonthOfYear(this.month, this.year, this.exercise_id)
      .subscribe((data: Result) => {
        if (data.success) {
          // console.log(data);
          this.records = data.values;
          console.log(this.records.length);
          this.records.forEach(record => {
            if (this.count < 10) {
              this.barChartLabels.push(
                'Ngày ' + record.schedule.day.toString()
              );
              this.times.push(record.time_swim);
              this.heart_rate.push(record.heart_rate);
              this.widthChart = this.widthChart + 50;
            }
            this.count++;
          });
          console.log(this.widthChart);
          // this.widthChart = 1200;
          this.divStyle = 'block';
          setTimeout(function() {
            this.widthChart = '100';
            console.log('hello');
          }, 100);
          // this.widthChart = '100';
        }
      });
  }
  public randomNum() {
    return Math.floor(Math.random() * 1000) + 1;
  }
}
