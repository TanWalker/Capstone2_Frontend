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
        beginAtZero: false,
        max: 100,
        min: 0,
        stepSize: 10
      }
    }
  };
  public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping'];

  public radarChartData: ChartDataSets[] = [
    { data: [85, 100, 70], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor(
    private authService: AuthService,
    private teamService: TeamService
  ) {
    this.authUser = authService;
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
  public calculateAge(birthday: Date) {
    // birthday is a date
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
