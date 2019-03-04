import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Class } from 'src/app/share/models/class';
import { AddClassComponent } from '../dialogs/add-class/add-class.component';
import { TeamService } from 'src/app/share/services/team.service';
import { Result } from 'src/app/share/models/result';
import { Constants } from 'src/app/share/constants';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css', '../../app.component.css']
})
export class ClassesComponent implements OnInit, OnDestroy {
  // global variable
  public teams: Class[] = [];
  public subTeams: any;
  public message = {
    have_not_team: ''
  };
  constructor(private dialog: MatDialog, private teamService: TeamService) {}

  ngOnInit() {
    // this.getVersion();
    this.getTeam();
    console.log(this.teams);
  }
  ngOnDestroy() {
    if (!isNullOrUndefined(this.subTeams)) {
      this.subTeams.unsubscrible();
    }
  }
  getTeam() {
    this.teamService.getAllTeam().subscribe((data: Result) => {
      if (data.success) {
        if (data.total === 0) {
          // set message
          this.message.have_not_team =
            Constants.message.manage_team.have_not_team;
          this.teams = [];
        } else {
          this.teams = data.values.reverse();
        }
      } else {
        console.log(data.errorMessage);
      }
    });
  }

  openDialogAddTeam(): void {
    const dialogRef = this.dialog.open(AddClassComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getTeam();
      }
    });
  }
  delete($event) {
    console.log($event);
    if ($event) {
      setTimeout(() => {
        this.getTeam();
      }, 50);
    }
  }
}
