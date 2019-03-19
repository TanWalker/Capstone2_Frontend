import { Injectable } from '@angular/core';
import { FeedBack } from '../models/feedBack';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

constructor(
  private http: HttpClient
) { }
public sendFeedBack(fb: FeedBack) {
  return this.http.post(`${environment.urls.api}` + `/public/sendFeedBack`, fb);
}
}
