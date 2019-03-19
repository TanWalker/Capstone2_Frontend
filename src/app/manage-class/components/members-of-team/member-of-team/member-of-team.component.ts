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

  // setup for triangle chart
   // Radar
   public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['BMI', 'Speed', 'Endurance'];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90] },
    { data: [28, 48, 40]}
  ];
  public radarChartType: ChartType = 'radar';
  constructor() { }

  ngOnInit() {
  }

}
