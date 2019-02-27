import { Component, OnInit, Input } from '@angular/core';
import { Lessonplan } from 'src/app/share/models/lessionplan';

@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.component.html',
  styleUrls: ['./lesson-plan.component.css']
})
export class LessonPlanComponent implements OnInit {

  @Input() lessonplan: Lessonplan;
  constructor() {}

  ngOnInit() {}
  edit() {
    console.log(this.lessonplan.name);
  }
}
