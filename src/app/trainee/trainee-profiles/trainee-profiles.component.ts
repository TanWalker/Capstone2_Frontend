import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/share/services/auth.service';
import { User } from 'src/app/share/models/user';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { TeamService } from 'src/app/share/services/team.service';
import { Result } from 'src/app/share/models/result';
import { Team } from 'src/app/share/models/team';

@Component({
  selector: 'app-trainee-profiles',
  templateUrl: './trainee-profiles.component.html',
  styleUrls: [
    './trainee-profiles.component.css',
    './../../manage-class/manage-class.component.css',
    './../../app.component.css'
  ]
})
export class TraineeProfilesComponent implements OnInit {
  public user: User = new User();
  public team: Team = new Team();
  public dob: Date = new Date();
  public age: Number;
  public authUser;
  public radarChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      ticks: {
        beginAtZero: true,
        max: 100,
        min: 0,
        stepSize: 10
      }
    }
  };
  public radarChartLabels: Label[] = ['Endurance', 'BMI', 'Speed'];
  public radarChartDataArr = [];
  public radarChartType: ChartType = 'radar';
  public endurance = 0;
  public bmi = 0;
  public speed = 0;
  public rateEndurance;
  public rateBmi;
  public rateSpeed;
  public divStyle;
  public radarChartData: ChartDataSets[] = [
    { data: this.radarChartDataArr, label: 'Series B' }
  ];
  constructor(
    private authService: AuthService,
    private teamService: TeamService
  ) {
    this.authUser = authService;
    this.getUserIndexAndRate();
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.teamService
      .getTeamByID(this.user.team_id)
      .subscribe((result: Result) => {
        this.team = result.value;
      });
    this.dob = new Date(this.user.dob);
    this.age = this.calculateAge(this.dob);
  }
  getUserIndexAndRate() {
    this.divStyle = 'none';
    this.authService.getUserIndex().subscribe((data: Result) => {
      console.log(data);
      this.endurance = data.value.endurance;
      this.bmi = data.value.bmi;
      this.speed = data.value.speed;
      this.authService
        .getUserHRTips(this.endurance)
        .subscribe((enData: Result) => {
          if (enData.success) {
            this.rateEndurance = enData.values[0].myStatus;
          }
        });
      this.authService.getUserBMITips(this.bmi).subscribe((bmiData: Result) => {
        if (bmiData.success) {
          this.rateBmi = bmiData.values[0].myStatus;
        }
      });
      this.authService
        .getUserSpeedTips(this.speed)
        .subscribe((speedData: Result) => {
          if (speedData.success) {
            this.rateSpeed = speedData.values[0].myStatus;
          }
        });
    });
    this.radarChartData = [{ data: [50, 60, 90], label: 'Series B' }];
    this.divStyle = 'block';
  }
  public calculateAge(birthday: Date) {
    // birthday is a date
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
