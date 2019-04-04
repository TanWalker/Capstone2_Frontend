import { Component, OnInit, Input } from '@angular/core';
import { Record } from 'src/app/share/models/record';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  @Input() recordExercise: Record;
  @Input() submittedMonth;
  @Input() submittedYear;
  @Input() submittedYearOnly;
  @Input() isYearOnly;
  constructor() { }

  ngOnInit() {
  }

}
