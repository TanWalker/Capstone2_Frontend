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
  public radarChartOptions: ChartOptions = {
    responsive: true
  };
  public radarChartLabels: Label[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ];

  public radarChartData: ChartDataSets[] = [
    { data: [56, 48, 40, 45, 96, 50, 100], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor(
    private authService: AuthService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.teamService.getTeamByID(this.user.team_id).subscribe((result: Result) => {
      this.team = result.value;
    });
  }
}
