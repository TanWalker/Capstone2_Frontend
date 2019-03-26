import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/share/models/member';
import { Schedule } from 'src/app/share/models/schedule';
import { Record } from 'src/app/share/models/record';
import { RecordService } from 'src/app/share/services/record.service';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-single-record',
  templateUrl: './single-record.component.html',
  styleUrls: ['./single-record.component.css']
})
export class SingleRecordComponent implements OnInit {
  @Input() member: Member;
  @Input() currentSchedule: Schedule;
  @Input() exercise_id: String;
  public record: Record = new Record();
  public currentRecord: Record = new Record();
  public not_available: String = 'N/A';
  constructor(
    private recordService: RecordService
  ) {}
  ngOnInit() {
    // Show existing record in data
    this.currentRecord.exercise_id = this.exercise_id;
    this.currentRecord.user_id = this.member.id;
    this.currentRecord.schedule_id = this.currentSchedule.id;
    this.recordService
      .getRecordByUserScheduleExercise(this.currentRecord)
      .subscribe((data: Result) => {
      });
    this.record.user_id = this.member.id;
    this.record.schedule_id = this.currentSchedule.id;
    this.record.exercise_id = this.exercise_id;
  }
}
