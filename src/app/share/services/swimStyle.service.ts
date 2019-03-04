import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwimStyleService {

constructor(
  private http: HttpClient
) { }
getAllStyle() {
  return this.http.get(`${environment.urls.api}` + `/public/getSwimStyle`);
 }
}
