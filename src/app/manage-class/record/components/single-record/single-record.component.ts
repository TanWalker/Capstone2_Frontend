import { Component, OnInit, Input } from '@angular/core';
import { Record } from 'src/app/share/models/record';

@Component({
  selector: 'app-single-record',
  templateUrl: './single-record.component.html',
  styleUrls: ['./single-record.component.css']
})
export class SingleRecordComponent implements OnInit {
  @Input() user_id: String;
  @Input() schedule_id: String;
  @Input() team_name: String;
  constructor() { }
  ngOnInit() {
  }

}
