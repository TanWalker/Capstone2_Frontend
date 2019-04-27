import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Member } from 'src/app/share/models/member';
import { Schedule } from 'src/app/share/models/schedule';
import { Record } from 'src/app/share/models/record';
import { RecordService } from 'src/app/share/services/record.service';
import { Result } from 'src/app/share/models/result';
import { Exercise } from 'src/app/share/models/exercise';
import { NotificationService } from 'src/app/share/services/notification.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-single-record',
  templateUrl: './single-record.component.html',
  styleUrls: ['./single-record.component.css']
})
export class SingleRecordComponent implements OnInit, OnDestroy {
  @Input() member: Member;
  @Input() currentSchedule: Schedule;
  @Input() currentFinalExercise: Exercise;
  public record: Record = new Record();
  public not_available: String = 'N/A';
  public subNotification: any;
  public subRecord: any;
  constructor(
    private recordService: RecordService,
    private notificationService: NotificationService,
    ) {}
  ngOnInit() {

    this.getExistRecord();
    this.record.schedule_id = this.currentSchedule.id;
    this.record.exercise_id = this.currentFinalExercise.id;
    this.record.user_id = this.member.id;
    // console.log(this.record);
    this.getNotification();
  }
  getNotification() {
      this.notificationService.getNotification().subscribe(
            (notification) => {
              if (notification.isAdd) {
                this.addRecord(this.record);
                // console.log(this.record);
              }
            }
          );
  }
  ngOnDestroy() {
   if ( !isNullOrUndefined( this.subNotification )) { this.subNotification.unsubscrible(); }
   if ( !isNullOrUndefined( this.subRecord )) { this.subRecord.unsubscrible(); }

  }

  addRecord(record: Record) {
    this.recordService.addRecord(record).subscribe((res: Result) => {
      // console.log(res);
    });
  }

  getExistRecord() {
    this.recordService.getRecordByUserScheduleExercise(
      this.member.id,
      this.currentSchedule.id,
      this.currentFinalExercise.id
    )
    .subscribe((data: Result) => {

      if (data.success) {
        this.record = data.values[0];
      }
    });
  }

}
