import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddNutritionComponent } from './dialogs/add-nutrition/add-nutrition.component';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: [
    './nutrition.component.css',
    './../../manage-class.component.css',
    './../../../app.component.css'
  ]
})
export class NutritionComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  openDialogAddVideo() {
    const dialogRef = this.dialog.open(AddNutritionComponent, {
      disableClose: true,
      maxWidth: '300px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // this.getCategory();
      }
      console.log(res);
    });
  }
}
