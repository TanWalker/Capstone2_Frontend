import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(loginInfo: Login) {
    return this.http.post(`${environment.urls.api}/public/login`, loginInfo);
  }
  regis(user: User) {
    return this.http.post(`${environment.urls.api}/public/register`, user);
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  updateUser(user: User) {
    return this.http.put(`${environment.urls.api}/updateUser`, user);
  }
  getCurrentUser() {
    return this.http.get(`${environment.urls.api}/getCurrentUser`);
  }
  getUserBMITips(bmi: number) {
    return this.http.get(`${environment.urls.api}/getUserBMITips/` + `${bmi}`);
  }
  getUserHRTips(hr: number) {
    return this.http.get(`${environment.urls.api}/getUserHRTips/` + `${hr}`);
  }
  getUserSpeedTips(tips: number) {
    return this.http.get(
      `${environment.urls.api}/getUserSpeedTips/` + `${tips}`
    );
  }

  getAllExistingTrainee() {
    return this.http.get(`${environment.urls.api}/getTrainee`);
  }
}
