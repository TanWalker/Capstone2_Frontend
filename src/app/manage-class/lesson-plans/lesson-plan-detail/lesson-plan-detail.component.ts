import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-lesson-plan-detail',
  templateUrl: './lesson-plan-detail.component.html',
  styleUrls: ['./lesson-plan-detail.component.css']
})
export class LessonPlanDetailComponent implements OnInit {
  public lessonplan_id = '';
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.lessonplan_id = paramMap.get('id');
      }
    });
  }

  ngOnInit() {
  }
}
