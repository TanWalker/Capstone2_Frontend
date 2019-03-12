import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSnackBar
} from '@angular/material';
import { Class } from 'src/app/share/models/class';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import { Constants } from 'src/app/share/constants';
import { TeamService } from 'src/app/share/services/team.service';
import { Result } from 'src/app/share/models/result';
const message = {
  box: {
    title: Constants.box.edit_team.title,
    message: Constants.box.edit_team.message,
    confirm: Constants.box.edit_team.confirm
  }
};
@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css', '../../../app.component.css']
})
export class EditClassComponent implements OnInit {
  public newTeam: Class = new Class();
  isSaveBtnDisabled = true;
  public message = message;
  public currentTeamId: String = '';
  public currentTeamName: String = '';
  public currentTeamAge: String = '';
  constructor(
    private dialogRef: MatDialogRef<EditClassComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private teamService: TeamService,
    private snackBar: MatSnackBar
  ) {
    this.currentTeamId = data.team.id;
    this.currentTeamName = data.team.name;
    this.currentTeamAge = data.team.age;
    this.newTeam = data.team;
  }
  onChange() {
    if (
      this.currentTeamName.localeCompare(this.newTeam.name.toString()) === 0 &&
      this.currentTeamAge
        .toString()
        .localeCompare(this.newTeam.age.toString()) === 0
    ) {
      // if text not changed from the original
      this.isSaveBtnDisabled = true;
    } else {
      // if different from the original text
      this.isSaveBtnDisabled = false;
    }
  }
  ngOnInit() {}
  updateTeam() {
    // this.class.id = this.data.id;
    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      }
    });
    messageDialogRef.afterClosed().subscribe(res => {
      this.newTeam.name = this.currentTeamName;
      this.newTeam.age = this.currentTeamAge;
      if (res) {
        this.teamService
          .updateTeam(this.newTeam)
          .subscribe((result: Result) => {
            if (result.success) {
              console.log(result);
              console.log(this.newTeam);
              // this.data.isRefresh.emit(true);
              this.dialogRef.close(true);
              this.snackBar.open('Lưu thành công!', 'Đóng', {
                duration: 6000
              });
            } else {
              this.snackBar.open('Lỗi! không thể lưu', 'Đóng', {
                duration: 3000
              });
            }
          });
      }
    });
  }
}
