import { Component, OnInit } from '@angular/core';
import { Lessonplan } from 'src/app/share/models/lessionplan';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddLessonComponent } from './dialogs/add-lesson/add-lesson.component';

@Component({
  selector: 'app-lesson-plans',
  templateUrl: './lesson-plans.component.html',
  styleUrls: ['./lesson-plans.component.css', '../../app.component.css']
})
export class LessonPlansComponent implements OnInit {
  public lessonplans: Lessonplan[] = [];
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.getClasses();
  }
  openDialogAddLesson(): void {
    this.dialog.open(AddLessonComponent, {
      disableClose: true
    });
  }
  public getClasses() {
    const lessonp1 = new Lessonplan('1', 'lesson1', '2', '300', '3');
    const lessonp2 = new Lessonplan('2', 'lesson2', '2', '422', '2');
    const lessonp3 = new Lessonplan('3', 'lesson3', '2', '622', '1');
    const lessonp4 = new Lessonplan('4', 'lesson4', '2', '854', '6');
    const lessonp5 = new Lessonplan('5', 'lesson5', '2', '125', '4');

    this.lessonplans.push(lessonp1);
    this.lessonplans.push(lessonp2);
    this.lessonplans.push(lessonp3);
    this.lessonplans.push(lessonp4);
    this.lessonplans.push(lessonp5);

  }
}
