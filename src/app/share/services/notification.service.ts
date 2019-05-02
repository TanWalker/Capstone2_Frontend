import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<any>();

  constructor() {}
  public getNotification() {
    if (!isNullOrUndefined(this.subject)) {
      return this.subject.asObservable();
    }
  }

  public destroySubject() {
    this.subject = new Subject<any>();
  }
  public fireEvent() {
    console.log(this.subject);
    this.subject.next({ isAdd: true });
  }
}
