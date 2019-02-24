import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { UserService } from '../../services/user.service';
import { Result } from '../../models/result';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../app.component.css']
})
export class LoginComponent implements OnInit {

  // local
  public loginInfo: Login = new Login();
  public isSubmit = false;
  public loginForm: FormGroup;
  public userName = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  public message = '';
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
   this.initialValidation();
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

        console.log(response);

        if (response.success) {

        // response should return token and user info
        const data = response.success ? response.values : '';
        const token = data.token;
        const user = data.user;
        // const expiresIn = data.expiresIn;
        // this.authService.setUser(response.value, response.value.token);
        this.authService.setUser(data.user, token);
        this.router.navigate(['/class']);
        // reset form
        this.isSubmit = false;

        } else {
            this.message = response.errorMessage.toString();
        }

      } , error => {
        console.log(JSON.stringify(error));
      }
    );

  }
  regis() {
    this.router.navigate(['/register']);

  }
}
