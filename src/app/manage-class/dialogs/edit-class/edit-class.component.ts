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
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
const message = {
  box: {
    title: Constants.box.edit_team.title,
    message: Constants.box.edit_team.message,
    confirm: Constants.box.edit_team.confirm
  },
  snackBar: {
    success: Constants.snackBar.edit_team.success,
    fail: Constants.snackBar.edit_team.fail,
    title: Constants.snackBar.edit_team.title,
  },
  error: {
    name: Constants.error.edit_team.name,
    age: Constants.error.edit_team.age
  }
};
@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css', '../../../app.component.css']
})
export class EditClassComponent implements OnInit {
  public newTeam: Class = new Class();
  public isSaveBtnDisabled = true;
  public message = message;
  public currentTeamId: String = '';
  public currentTeamName: String = '';
  public currentTeamAge: String = '';

  // form
  public isSubmit = false;
  public editClassForm: FormGroup;
  public name = new FormControl('', [Validators.required]);
  public age = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditClassComponent>,
    private dialog: MatDialog,
    private teamService: TeamService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentTeamId = this.data.team.id;
    this.currentTeamName = this.data.team.name;
    this.currentTeamAge = this.data.team.age;
    this.newTeam = this.data.team;
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
  updateTeam() {
    console.log('update team');
    // set isSubmit
    this.isSubmit = true;

    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      },
      panelClass: 'alert-bg'
    });
    messageDialogRef.afterClosed().subscribe(res => {
      this.newTeam.name = this.currentTeamName;
      this.newTeam.age = this.currentTeamAge;
      if (res) {
        this.teamService
          .updateTeam(this.newTeam)
          .subscribe((result: Result) => {
            if (result.success) {
              this.dialogRef.close(true);
              this.snackBar.open(this.message.snackBar.success, this.message.snackBar.title, {
                duration: 6000
              });
            } else {
              this.snackBar.open(this.message.snackBar.fail, this.message.snackBar.title, {
                duration: 3000
              });
            }

             // reset form
          this.isSubmit = false;
          });
      }
    });
  }
}
