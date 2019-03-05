import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Class } from 'src/app/share/models/class';
import { Constants } from 'src/app/share/constants';
import { TeamService } from 'src/app/share/services/team.service';
import { Result } from 'src/app/share/models/result';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';

const message = {
  error: {
    name: Constants.error.create_team.name,
    age: Constants.error.create_team.age,
    numberal: Constants.error.create_team.numberal
  },
  box: {
    title: Constants.box.create_team.title,
    message: Constants.box.create_team.message,
    confirm: Constants.box.create_team.confirm
  }
};

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css', '../../../app.component.css']
})
export class AddClassComponent implements OnInit {
  public classForm: FormGroup;
  public class: Class = new Class();
  public name = new FormControl('', [Validators.required]);
  public age = new FormControl('', [Validators.required]);
  public numberal = new FormControl('', [Validators.required]);
  public isSubmit = false;
  public message = message;
  public subTeam: any;
  constructor(
    public dialogRef: MatDialogRef<AddClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.initialValidation();
  }

  initialValidation() {
    this.classForm = this.formBuilder.group({});
    this.classForm.addControl('name', this.name);
    this.classForm.addControl('age', this.age);
    this.classForm.addControl('numberal', this.numberal);
  }
  createTeam(): void {
    // set isSubmit
    this.isSubmit = true;
    // check validation
    if (this.classForm.invalid) {
      return;
    }

    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      }
    });
    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        // openloading
        this.subTeam = this.teamService
          .createTeam(this.class)
          .subscribe((result: Result) => {
            result.success
              ? this.dialogRef.close(true)
              : console.log('create error');
              // closeloading
          });
      }
    });
  }
}
