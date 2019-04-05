import { Component, OnInit, Input } from '@angular/core';
import { Record } from 'src/app/share/models/record';
import { RecordService } from 'src/app/share/services/record.service';
import { MatDialog } from '@angular/material';
import { RecordDetailComponent } from '../../../dialogs/record-detail/record-detail.component';

@Component({
  selector: 'app-record-by-month-year-ex',
  templateUrl: './record-by-month-year-ex.component.html',
  styleUrls: ['./record-by-month-year-ex.component.css']
})
export class RecordByMonthYearExComponent implements OnInit {
  @Input() record: Record;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  openDialogRecordDetail(record: Record) {
    const dialogRef = this.dialog.open(RecordDetailComponent, {
      maxWidth: '360px',
      width: '100%',
      data: {
        record: record
      }
      // autoFocus: false
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }
}
