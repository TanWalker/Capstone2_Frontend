import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { UserService } from '../../services/user.service';
import { Result } from '../../models/result';
import { AuthService } from '../../services/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../app.component.css']
})
export class LoginComponent implements OnInit {
  // local
  public loginInfo: Login = new Login();
  public isSubmit = false;
  public loginForm: FormGroup;
  public userName = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  public message = '';

  isMobile = null;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {
    this.initialValidation();
    this.isMobile = this.deviceService.isMobile();
  }

  initialValidation() {
    this.loginForm = this.formBuilder.group({});
    this.loginForm.addControl('userName', this.userName);
    this.loginForm.addControl('password', this.password);
  }
  login() {
    // set isSubmit
    this.isSubmit = true;
    // check validation
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginInfo).subscribe(
      (response: Result) => {
        if (response.success) {
          // response should return token and user info
          const data = response.success ? response.values : '';
          const token = data.token;
          // const expiresIn = data.expiresIn;
          // this.authService.setUser(response.value, response.value.token);
          this.authService.setUser(data.user, token);
          if (this.authService.isCoach()) {
            this.router.navigate(['/class']);
          }
          if (this.authService.isTrainee()) {
            this.router.navigate(['/trainee']);
          }
          // reset form
          this.isSubmit = false;
        } else {
          this.message = response.errorMessage.toString();
        }
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }
  regis() {
    this.router.navigate(['/register']);
  }
}
