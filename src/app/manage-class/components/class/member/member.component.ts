import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/share/models/member';
import { count } from 'rxjs/operators';
import { Constants } from 'src/app/share/constants';
import { MatDialog } from '@angular/material';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { TeamService } from 'src/app/share/services/team.service';
const message = {
  box: {
    title: Constants.box.remove_member.title,
    message: Constants.box.remove_member.message,
    confirm: Constants.box.remove_member.confirm
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
  public message = message;
  constructor(
    private dialog: MatDialog,
    private teamService: TeamService
  ) {}

  ngOnInit() {
     console.log(this.member);
  }
  removeMember() {
    console.log(this.member);
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
        // this.teamService
        //   .updateTeam(this.newTeam)
        //   .subscribe((result: Result) => {
        //     if (result.success) {
        //       console.log(result);
        //       console.log(this.newTeam);
        //       // this.data.isRefresh.emit(true);
        //       this.dialogRef.close(true);
        //       this.snackBar.open('Lưu thành công!', 'Đóng', {
        //         duration: 6000
        //       });
        //     } else {
        //       this.snackBar.open('Lỗi! không thể lưu', 'Đóng', {
        //         duration: 3000
        //       });
        //     }
        //   });
      }
    });
  }
}
