import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { UserService } from '../../services/user.service';
import { Result } from '../../models/result';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginInfo: Login = new Login();
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {

    // post login model

    // step 1 : set value for login
    this.loginInfo.username = 'aaaaaa';
    this.loginInfo.password = '12312';


    this.userService.login(this.loginInfo).subscribe(
      (response: Result) => {
        console.log(response);
         // response should return token and user info
         this.authService.setUser(response.value, response.value.token);

        // token
      }
    );

    this.router.navigate(['/class']);
  }
}
