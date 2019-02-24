import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}
  ngOnInit() {
  }
  createTeam(): void {
    this.router.navigate(['/class/classes/edit']);
    this.dialogRef.close();
  }

}
