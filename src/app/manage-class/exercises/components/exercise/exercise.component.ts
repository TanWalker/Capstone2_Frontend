import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/share/models/exercise';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() logo: String;
  constructor() { }

  ngOnInit() {
  }

}
