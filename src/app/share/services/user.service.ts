import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(
  private http: HttpClient
) { }

login(loginInfo: Login) {
  return this.http.post(`${environment.urls.api}/public/login`, loginInfo);
}
}
