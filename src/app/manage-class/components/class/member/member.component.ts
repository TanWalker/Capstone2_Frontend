import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Member } from 'src/app/share/models/member';
import { count } from 'rxjs/operators';
import { Constants } from 'src/app/share/constants';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { TeamService } from 'src/app/share/services/team.service';
import { Result } from 'src/app/share/models/result';
const message = {
  box: {
    title: Constants.box.remove_member.title,
    message: Constants.box.remove_member.message,
    confirm: Constants.box.remove_member.confirm
  },
  message: {
    success: Constants.snackBar.remove_member.success,
    fail: Constants.snackBar.remove_member.fail,
    title: Constants.snackBar.remove_member.title
  }
};
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css', './../../../manage-class.component.css']
})
export class MemberComponent implements OnInit {
  @Input() member: Member;
  @Input() count: String;
  @Output() isDeleted = new EventEmitter<boolean>();
  public message = message;
  constructor(
    private dialog: MatDialog,
    private teamService: TeamService,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit() {
  }
  removeMember() {
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      },
      panelClass: 'alert-bg'
    });
    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.teamService.removeTeamMember(this.member).subscribe(
          (response: Result) => {
            if (response.success) {
              this.snackBar.open(this.message.message.success, this.message.message.title, {
                duration: 6000
              });

              // fire event emitter
              this.isDeleted.emit(true);
            } else {
              this.snackBar.open(this.message.message.fail, this.message.message.title, {
                duration: 3000
              });
            }
          }
        );
      }
    });
  }
}
