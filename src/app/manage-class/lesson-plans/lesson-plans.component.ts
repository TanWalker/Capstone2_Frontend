import { Component, OnInit } from '@angular/core';
import { Lessonplan } from 'src/app/share/models/lessionplan';

@Component({
  selector: 'app-lesson-plans',
  templateUrl: './lesson-plans.component.html',
  styleUrls: ['./lesson-plans.component.css', '../../app.component.css']
})
export class LessonPlansComponent implements OnInit {

  public lessonplans: Lessonplan[] = [];
  constructor() { }

  ngOnInit() {
    this.getClasses();
  }
  public getClasses() {
    const lessonp1 = new Lessonplan('1', '1', 'ánh', '15');
    const lessonp2 = new Lessonplan('2', '1', 'dương', '16');
    const lessonp3 = new Lessonplan('3', '1', 'tiến', '17');
    const lessonp4 = new Lessonplan('4', '1', 'trí', '18');

    this.lessonplans.push(lessonp1);
    this.lessonplans.push(lessonp2);
    this.lessonplans.push(lessonp3);
    this.lessonplans.push(lessonp4);

    console.log(this.lessonplans);
  }

}
