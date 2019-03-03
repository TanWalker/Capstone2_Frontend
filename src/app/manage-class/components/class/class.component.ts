import { Component, OnInit, Input } from '@angular/core';
import { Class } from 'src/app/share/models/class';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css', '../../../app.component.css']
})
export class ClassComponent implements OnInit {
  @Input() team: Class;
  constructor() {}

  ngOnInit() {}
  edit() {
  }
}
