import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Result } from 'src/app/share/models/result';
import { RecordService } from 'src/app/share/services/record.service';
import { Record } from 'src/app/share/models/record';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {
  public record: Record;
  constructor(
    private dialogRef: MatDialogRef<RecordDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private recordService: RecordService
  ) {
  }

  ngOnInit() {
    this.record = this.data.record;
    console.log(this.record);
  }
}