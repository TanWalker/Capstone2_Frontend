import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/share/models/member';
import { Schedule } from 'src/app/share/models/schedule';
import { Record } from 'src/app/share/models/record';
import { RecordService } from 'src/app/share/services/record.service';
import { Result } from 'src/app/share/models/result';
import { Exercise } from 'src/app/share/models/exercise';

@Component({
  selector: 'app-single-record',
  templateUrl: './single-record.component.html',
  styleUrls: ['./single-record.component.css']
})
export class SingleRecordComponent implements OnInit {
  @Input() member: Member;
  @Input() currentSchedule: Schedule;
  @Input() currentFinalExercise: Exercise;
  public record: Record = new Record();
  public not_available: String = 'N/A';
  constructor(private recordService: RecordService) {}
  ngOnInit() {
    console.log(this.member.id);
    console.log(this.currentSchedule[0].id);
    console.log(this.currentFinalExercise.id);
    this.recordService
      .getRecordByUserScheduleExercise(
        this.member.id,
        this.currentSchedule[0].id,
        this.currentFinalExercise.id
      )
      .subscribe((data: Result) => {
        // this.record = data.values[0];
        // console.log(data.values);
        if (data.success) {
          this.record = data.values[0];
          // console.log(data.values[0]);
        }
        // console.log(data);
      });
  }
}
