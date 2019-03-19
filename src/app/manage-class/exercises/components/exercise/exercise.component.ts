import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from 'src/app/share/models/exercise';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() logo: String;
  @Input() isAdded: Boolean = false;
  @Output() add =  new EventEmitter<Exercise>();
  @Output() remove =  new EventEmitter<Exercise>();

  constructor() { }

  ngOnInit() {
  }
  addEx() {
    this.add.emit(this.exercise);
  }
  removeEx() {
    this.remove.emit(this.exercise);
  }
}
