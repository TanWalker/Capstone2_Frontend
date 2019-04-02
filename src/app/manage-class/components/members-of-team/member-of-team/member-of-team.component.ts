import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/share/models/user';
import { Constants } from 'src/app/share/constants';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
const constant = {
  default: {
    member: {
      phone: Constants.default.member.phone,
      address: Constants.default.member.address,
      height: Constants.default.member.height,
      weight: Constants.default.member.weight,
      avatar: Constants.default.member.avatar,
    },
  }
};
@Component({
  selector: 'app-member-of-team',
  templateUrl: './member-of-team.component.html',
  styleUrls: ['./member-of-team.component.css']
})

export class MemberOfTeamComponent implements OnInit {

  @Input() member: User;
  public message = constant;
  public isOut = Math.random() >= 0.5;
  // setup for triangle chart
  // Radar
  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['BMI', 'Speed', 'Endurance'];

  public radarChartData: ChartDataSets[] = [
    { data: [
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1],
      label: 'Trung bình' },
    { data: [
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1],
      label: 'Thực tế'}
  ];
  public radarChartType: ChartType = 'radar';
  constructor() { }

  ngOnInit() {
  }

}
