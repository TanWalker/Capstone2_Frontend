import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-record-by-month-year',
  templateUrl: './record-by-month-year.component.html',
  styleUrls: ['./record-by-month-year.component.css']
})
export class RecordByMonthYearComponent implements OnInit {
  public barChartLabels: Label[] = [
    'T1',
    'T2',
    'T3',
    'T4',
    'T6',
    'T6',
    'T7',
    'T8',
    'T9',
    'T10',
    'T11',
    'T12',
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
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
      ],
      label: 'Thời gian'
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
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
        this.randomNum(),
      ],
      label: 'Nhịp tim',
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
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
  });
  }

  ngOnInit() {
  }
  public randomNum() {
    return Math.floor(Math.random() * 1000) + 1;
  }
}
