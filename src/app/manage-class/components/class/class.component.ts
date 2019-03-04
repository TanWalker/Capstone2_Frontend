import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Class } from 'src/app/share/models/class';
import { TeamService } from 'src/app/share/services/team.service';
import { MatDialog } from '@angular/material';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Result } from 'src/app/share/models/result';
import { Constants } from 'src/app/share/constants';
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
  @Output() isDelete = new EventEmitter<boolean>();
  public message = message;
  public subDelelte: any;
  constructor(private teamService: TeamService, private dialog: MatDialog) {}

  ngOnInit() {}
  edit() {}
  openListMember() {}
  delete() {
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      }
    });
    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.subDelelte = this.teamService
          .deleteTeam(this.team.id)
          .subscribe((result: Result) => {
            console.log(result);
          });
        this.isDelete.emit(true);
      }
    });
  }
}
