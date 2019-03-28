import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Record } from '../models/record';
import * as _ from 'lodash';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ManageRecordService {

  private subject = new Subject<any>();
  private records: Record[] = [];
  constructor() { }


  public setRecord(records: Record[]) {
    this.records = records;
  }
  public addRecord(record: Record) {

    if (!_.find( this.records, record)) {
      this.records.push(record);
    }

    this.subject.next( {
      records : this.records
    });
  }
  public getNotification() {
    return this.subject.asObservable();
  }

  public destroySubject() {
    if (!isNullOrUndefined(this.subject)) {this.subject.unsubscribe(); }
  }
  public fireEvent() {
    this.subject.next( { isAdd : true } );
  }
  public resetExercise() {
    this.records = [];
  }
}
