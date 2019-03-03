import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css', '../../../app.component.css']
})
export class MessageBoxComponent implements OnInit {

  public title = '';
  public message = '';
  public confirm = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MessageBoxComponent>
  ) { }

  ngOnInit() {
    // setup
    this.title = this.data.title;
    this.message = this.data.message;
    this.confirm = this.data.confirm;
  }
  ok() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
