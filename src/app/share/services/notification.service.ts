import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = new Subject<any>();

  constructor() {
  }
  public getNotification() {
    if (!isNullOrUndefined(this.subject)) { return this.subject.asObservable(); }
  }

  public destroySubject() {
    if (this.subject !== null) {this.subject.unsubscribe(); }
  }
  public fireEvent() {
    this.subject.next( { isAdd : true } );
  }

}