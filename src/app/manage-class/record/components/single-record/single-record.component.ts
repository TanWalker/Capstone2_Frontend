import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/share/models/member';
import { Schedule } from 'src/app/share/models/schedule';

@Component({
  selector: 'app-single-record',
  templateUrl: './single-record.component.html',
  styleUrls: ['./single-record.component.css']
})
export class SingleRecordComponent implements OnInit {
  @Input() member: Member;
  @Input() currentSchedule: Schedule;
  public not_available: String = 'N/A';
  constructor() {}
  ngOnInit() {}
}
