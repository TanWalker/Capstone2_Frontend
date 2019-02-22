import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}
  openDialog(): void {
    this.dialog.open(ConfirmDialogComponent, {});
  }
  ngOnInit() {
    // this.getVersion();
  }
  /* getVersion() {
     this.versionService.getVersionBE().subscribe(
       (data) => {
         console.log(data);
       }
     );
     this.versionService.getVersionFRe();
   } */
}

@Component({
  selector: 'app-dialog-add-class',
  templateUrl: 'dialog-add-class.html'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}
  createTeam(): void {
    this.router.navigate(['/class/classes/edit']);
    this.dialogRef.close();
  }
}
