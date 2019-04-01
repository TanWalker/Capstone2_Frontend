import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TeamService } from 'src/app/share/services/team.service';
import { Result } from 'src/app/share/models/result';
import { Class } from 'src/app/share/models/class';
import { isNullOrUndefined } from 'util';
import { User } from 'src/app/share/models/user';
import { Constants } from 'src/app/share/constants';

const message = {
  message: {
      dontHaveTeam: Constants.message.manage_member.have_not_member
  }

};
@Component({
  selector: 'app-members-of-team',
  templateUrl: './members-of-team.component.html',
  styleUrls: [
    './members-of-team.component.css',
    './../../../app.component.css',
    './../../manage-class.component.css',

  ]
})
export class MembersOfTeamComponent implements OnInit, OnDestroy {

  public currentTeam: Class = new Class();
  public isMobile = false;
  public subTeams: any;
  public subMembers: any;
  public members: User[] = [];
  public teams: Class [] = [];
  public message = message;
  constructor(
    public deviceService: DeviceDetectorService,
    private teamService: TeamService
  ) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
    this.getListTeam();
  }
  ngOnDestroy() {
    if (this.subTeams !== null) { this.subTeams.unsubscribe(); }
  }
  getListTeam() {
      this.subTeams = this.teamService.getTeamByCoach().subscribe(
        (data: Result) => {
         this.teams = data.success ? data.values : [];
         if ( !isNullOrUndefined(this.teams)) {
          this.currentTeam = this.teams[0];
          this.getMemberByTeam(this.currentTeam.id);
         }
        }
      );
  }
  onChange(team: Class) {
   this.currentTeam = team;
   this.getMemberByTeam(this.currentTeam.id);
  }
  getMemberByTeam(teamId: String) {
    this.subMembers = this.teamService.getMemberByTeam(teamId).subscribe(
      (data: Result) => {
        this.members = data.success ? data.values : [];
      }
    );
  }
}
