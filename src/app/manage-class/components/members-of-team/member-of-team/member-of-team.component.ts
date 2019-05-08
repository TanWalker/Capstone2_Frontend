import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/share/models/user';
import { Constants } from 'src/app/share/constants';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthService } from 'src/app/share/services/auth.service';
import { Result } from 'src/app/share/models/result';
const constant = {
  default: {
    member: {
      phone: Constants.default.member.phone,
      address: Constants.default.member.address,
      height: Constants.default.member.height,
      weight: Constants.default.member.weight,
      avatar: Constants.default.member.avatar
    }
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
  public endurance = 0;
  public bmi = 0;
  public speed = 0;
  public isOut = Math.random() >= 0.5;
  // setup for triangle chart
  // Radar
  public radarChartOptions: ChartOptions = {
    responsive: true
  };
  public radarChartLabels: Label[] = ['BMI', 'Speed', 'Endurance'];

  public radarChartData: ChartDataSets[] = [
    // {
    //   data: [
    //     Math.floor(Math.random() * 100) + 1,
    //     Math.floor(Math.random() * 100) + 1,
    //     Math.floor(Math.random() * 100) + 1
    //   ],
    //   label: 'Trung bình'
    // },
    {
      data: [0, 0, 0],
      label: 'Chỉ số'
    }
  ];
  public radarChartType: ChartType = 'radar';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserIndex(this.member.id).subscribe((data: Result) => {
      if (data.success) {
        this.endurance = data.value.endurance;
        this.bmi = data.value.bmi;
        this.speed = data.value.speed;
        this.radarChartData = [
          { data: [this.bmi, this.speed, this.endurance], label: 'Chỉ số' }
        ];
      }
    });
  }
  formatPhoneNumber(number) {
    return number
      ? number.substr(0, 3) +
          ' ' +
          number.substr(3, 3) +
          ' ' +
          number.substr(6, 4)
      : null;
  }
}
