import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


// create new variable
public currentUser = new User();
constructor(
  private router: Router
) { }


public setUser(user: User, token: string) {

  // set new user
  this.currentUser = user;

  // set token
  localStorage.setItem('access_token', token);

  // set current user
  localStorage.setItem('current_user', JSON.stringify(this.currentUser));

}

public getToken() {
  return localStorage.getItem('access_token');
}

public getCurrentUserFromLocalStorate() {
  const user: User = JSON.parse(localStorage.getItem('current_user'));
  return user;
}

public logout(): void {

  // Remove tokens and expiry time from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('current_user');


  // reset user
  this.currentUser = new User();

  // Go back to the home route
  this.router.navigate(['/']);
}


public isLogined() {
  if (!this.currentUser.username) {
    return false;
  } else {
    return true;
  }
}
public getCurrentUser() {
  return this.currentUser;
}

public autoGetCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('current_user'));
}

// private getAuthData() {
//   const token = localStorage.getItem('access_token');
// //  const expirationDate: any = localStorage.getItem('expires_at');
//   const current_user = localStorage.getItem('current_user');
//   if ( !token || ! expirationDate) {
//     return;
//   }
//   return {
//     token: token,
//     expirationDate: new Date( expirationDate * 1000),
//     current_user: current_user
//   };
// }

}
