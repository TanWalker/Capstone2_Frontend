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
  constructor(
    private recordService: RecordService,
    private notificationService: NotificationService
    ) {}
  ngOnInit() {
    // console.log(this.currentFinalExercise.id);
    // this.recordService
    //   .getRecordByUserScheduleExercise(
    //     this.member.id,
    //     this.currentSchedule[0].id,
    //     this.currentFinalExercise.id
    //   )
    //   .subscribe((data: Result) => {
    //     // this.record = data.values[0];
    //     // console.log(data.values);
    //     if (data.success) {
    //       this.record = data.values[0];
    //       // console.log(data.values[0]);
    //     }
    //     // console.log(data);
    //   });
    this.record.user_id = this.member.id;
    this.getNotification();
  }
  getNotification() {
      this.notificationService.getNotification().subscribe(
            (notification) => {
              if (notification.isAdd) {
                console.log(this.record);
              }
            }
          );
  }
  ngOnDestroy() {
   if ( !isNullOrUndefined( this.subNotification )) { this.subNotification.unsubscrible(); }
  }

  addRecord(record: Record) {
    this.recordService.addRecord(record).subscribe((res: Result) => {
      console.log(res);
    });
  }
  testAddRecord() {
    const record = new Record();
    record.min_hr = this.record.min_hr;
    record.max_hr = this.record.max_hr;
    record.min_time = this.record.min_time;
    record.max_time =  this.record.max_time;
    record.heart_rate = this.record.heart_rate;
    record.exercise_id = '14';
    record.user_id = '10';
    record.time_swim = 14;
    record.errors = 'thực hiện lỗi';
    record.result = 'good';
    record.note = ' aaaaaannnnnncccccccc';
    record.attitude = ' khá tốt ';
    this.addRecord(record);
  }
}
