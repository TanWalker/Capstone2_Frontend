import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { UserService } from '../../services/user.service';
import { Result } from '../../models/result';
import { AuthService } from '../../services/auth.service';
import { VersionService } from '../../services/version.service';

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
    private authService: AuthService,
    private versionService: VersionService
  ) { }

  ngOnInit() {
    this.versionService.getVersionBE().subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  login() {

      // step 1 : set value for login
      this.loginInfo.username = 'darkwin';
      this.loginInfo.password = '0511730580';
    this.userService.login(this.loginInfo).subscribe(
      (response: Result) => {

         // response should return token and user info

        const data = response.success ? response.value : '';

        const token = data.token;

        // const expiresIn = data.expiresIn;
        // this.authService.setUser(response.value, response.value.token);
        this.authService.setUser(data.user, token);
        // token
      }
    );

    this.router.navigate(['/class']);
  }
}
