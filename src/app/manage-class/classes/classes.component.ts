import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Class } from 'src/app/share/models/class';
import { AddClassComponent } from '../dialogs/add-class/add-class.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css', '../../app.component.css']
})
export class ClassesComponent implements OnInit {
  public classes: Class[] = [];
  constructor(public dialog: MatDialog, private router: Router) {}
  openDialog(): void {
    this.dialog.open(AddClassComponent, {
      minWidth: '300px',
      minHeight: '400px',
      hasBackdrop: false
    });
  }
  ngOnInit() {
    // this.getVersion();
    this.getClasses();
  }
  public getClasses() {
    // const class1 = new Class('1', '1', 'ánh', '15');
    // const class2 = new Class('2', '1', 'dương', '16');
    // const class3 = new Class('3', '1', 'tiến', '17');
    // const class4 = new Class('4', '1', 'trí', '18');

    // this.classes.push(class1);
    // this.classes.push(class2);
    // this.classes.push(class3);
    // this.classes.push(class4);

    // console.log(this.classes);
  }
}
