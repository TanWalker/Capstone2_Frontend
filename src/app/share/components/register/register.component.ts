import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Result } from '../../models/result';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../app.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User = new User();

  isMobile = null;
  constructor(
    private userService: UserService,
    private deviceService: DeviceDetectorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }

  regis() {
      this.userService.regis(this.user).subscribe(
        (res: Result) => {
            // console.log(res);
        }
      );
  }
  login() {
    this.router.navigate(['/login']);
  }
}
