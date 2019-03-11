import { Component, OnInit, Input } from '@angular/core';
import { Distance } from 'src/app/share/models/distance';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css']
})
export class DistanceComponent implements OnInit {
  @Input() distance: Distance;
  @Input() last: any;
  constructor() {}

  ngOnInit() {
  }

}
