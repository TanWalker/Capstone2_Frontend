import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from '../share/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../share/models/user';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css', './../app.component.css'],
  animations: [fadeAnimation]
})
export class ManageClassComponent implements OnInit {
  public currentUrl: string;
  public isMobile = false;
  public user = new User();
  public exerciseParentsTab: boolean;
  public teamParentsTab: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
    private authService: AuthService,
    private router: Router,
  ) {
    router.events.subscribe((_: NavigationEnd) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      if (_.url !== undefined) {
        this.currentUrl = _.url;
      }
      // console.log(this.ActiveRoute.snapshot.paramMap.get('id'));
    });
  }

  ngOnInit() {
    // install URL
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
    // get current user
    this.user = this.authService.currentUser;
    // check mobile or desktop
    this.isMobile = this.deviceService.isMobile();
    console.log(this.user);
  }
  goToProfile() {
    this.router.navigate(['/class/profiles']);
  }
  logout() {
    this.authService.logout();
  }
}
