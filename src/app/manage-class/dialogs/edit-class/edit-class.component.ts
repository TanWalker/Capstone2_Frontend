import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css', '../../../app.component.css']
})
export class EditClassComponent implements OnInit {
  team = '';
  age = '';
  isSaveBtnDisabled = true;
  constructor(
    private dialogRef: MatDialogRef<EditClassComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog
  ) {}
  onChange($event) {
    if (this.team.localeCompare($event) === 0) {
      // if text not changed from the original
      this.isSaveBtnDisabled = true;
    } else {
      // if different from the original text
      this.isSaveBtnDisabled = false;
    }
  }
  ngOnInit() {
    this.team = this.data.team;
    this.age = this.data.age;
  }
}
