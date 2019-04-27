import { Component, OnInit } from '@angular/core';
import { User } from '../share/models/user';
import { AuthService } from '../share/services/auth.service';
import { Router } from '@angular/router';
import { fadeAnimation } from '../animations';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css', './../app.component.css'],
  animations: [fadeAnimation]
})
export class TraineeComponent implements OnInit {
  public isMobile = false;
  public user: User = new User();
  public authUser;
  constructor(
    private authService: AuthService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
    if (authService.isCoach()) {
      this.router.navigate(['/class']);
    }
    this.user = authService.currentUser;
    // console.log(authService.getCurrentUser);
    this.authUser = authService;
  }

  ngOnInit() {
    // check mobile or desktop
    this.isMobile = this.deviceService.isMobile();
  }
}
