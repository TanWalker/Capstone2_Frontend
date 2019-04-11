import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Label, Color } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { RecordService } from 'src/app/share/services/record.service';
import { Result } from 'src/app/share/models/result';
import { MonthlyRecord } from 'src/app/share/models/monthly_record';
@Component({
  selector: 'app-record-by-year',
  templateUrl: './record-by-year.component.html',
  styleUrls: ['./record-by-year.component.css']
})
export class RecordByYearComponent implements OnInit {
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
  public year: Number;
  public exercise_id: Number;
  public MonthlyRecord: MonthlyRecord[];
  public divStyle;
  public widthChart = 150;
  public count = 1;
  public tempLabels: Label[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private recordService: RecordService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.year = params.year;
      this.exercise_id = params.exercise_id;
    });
  }

  ngOnInit() {
    // this.recordService
    //   .getListRecordByMonthOfYear(this.month, this.year, this.exercise_id)
    //   .subscribe((data: Result) => {
    //     if (data.success) {
    //       // console.log(data);
    //       this.records = data.values;
    //       console.log(this.records.length);
    //       this.records.forEach(record => {
    //         // if (this.count < 10) {
    //         this.barChartLabels.push('Ngày ' + record.schedule.day.toString());
    //         this.times.push(record.time_swim);
    //         this.heart_rate.push(record.heart_rate);
    //         this.widthChart = this.widthChart + 50;
    //         // }
    //         // this.count++;
    //       });
    //       // console.log(this.widthChart);
    //       // this.widthChart = 1200;
    //       this.divStyle = 'block';
    //       setTimeout(function() {
    //         this.widthChart = '100';
    //         console.log('hello');
    //       }, 100);
    //       // this.widthChart = '100';
    //     }
    //   });
    this.divStyle = 'none';
    this.recordService
      .getListRecordByYear(this.year, this.exercise_id)
      .subscribe((data: Result) => {
        if (data.success) {
          this.MonthlyRecord = data.values;
          console.log(this.MonthlyRecord.length);
          this.MonthlyRecord.forEach(record => {
            // if (this.count < 10) {
            this.barChartLabels.push(record.month.toString());
            this.times.push(record.avg_time);
            this.heart_rate.push(record.avg_hr);
            this.widthChart = this.widthChart + 50;
            // }
            // this.count++;
          });
          // console.log(this.widthChart);
          // this.widthChart = 1200;
          this.divStyle = 'block';
          // this.widthChart = '100';
          console.log(this.times);
          console.log(this.heart_rate);
          console.log(this.barChartLabels);
        }
      });
  }
  public randomNum() {
    return Math.floor(Math.random() * 1000) + 1;
  }
}
