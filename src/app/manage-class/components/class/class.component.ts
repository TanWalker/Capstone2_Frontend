import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Class } from 'src/app/share/models/class';
import { TeamService } from 'src/app/share/services/team.service';
import { MatDialog } from '@angular/material';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Result } from 'src/app/share/models/result';
import { Constants } from 'src/app/share/constants';
import { User } from 'src/app/share/models/user';
import { EditClassComponent } from '../../dialogs/edit-class/edit-class.component';
import { AddMemberComponent } from '../../dialogs/add-member/add-member.component';
const message = {
  box: {
    title: Constants.box.delete_team.title,
    message: Constants.box.delete_team.message,
    confirm: Constants.box.delete_team.confirm
  }
};

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css', '../../../app.component.css']
})
export class ClassComponent implements OnInit {
  @Input() team: Class;
  @Output() isRefresh = new EventEmitter<boolean>();
  public message = message;
  public subDelelte: any;
  panelOpenState = false;
  public members: User[] = [];

  constructor(private teamService: TeamService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getListMember();
  }
  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }
  getListMember() {
    this.teamService.getMemberByTeam(this.team.id).subscribe((data: Result) => {
      if (data.success) {
        this.members = data.values;
        console.log(this.members);

      } else {
        console.log(data.errorMessage);
      }
    });
  }
  delete(team) {
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: team,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      },
      panelClass: 'alert-bg'
    });
    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.subDelelte = this.teamService
          .deleteTeam(this.team.id)
          .subscribe((result: Result) => {
            if (result.success) {
            } else {
              console.log(result);
            }
          });
        this.isRefresh.emit(true);
      }
    });
  }
  edit(): void {
    const dialogRef = this.dialog.open(EditClassComponent, {
      disableClose: true,
      maxWidth: '300px',
      data: {
        team: this.team,
        isRefresh: this.isRefresh
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // this.isRefresh.emit(true);
      }
    });
  }
  addMember() {

    const dialogRef = this.dialog.open(AddMemberComponent, {
      disableClose: false,
      maxWidth: '400px',
      data: {
        team: this.team
      },
      panelClass: 'add-class'

    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // this.isRefresh.emit(true);
      }
    });
  }

  refreshClass( $event ) {
    if ($event) {
      this.getListMember();
    }
    console.log($event);
  }
}
