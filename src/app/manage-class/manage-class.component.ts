import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { VersionService } from '../share/services/version.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.scss']
})
export class ManageClassComponent implements OnInit {

  constructor(
   private versionService: VersionService,
   public dialog: MatDialog
  ) { }
  openDialog() {
    this.dialog.open(ConfirmDialogComponent, {
    });
  }
  ngOnInit() {
    // this.getVersion();
  }
  getVersion() {
    this.versionService.getVersion().subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
@Component({
  selector: 'app-dialog-add-class',
  templateUrl: 'dialog-add-class.html',
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
