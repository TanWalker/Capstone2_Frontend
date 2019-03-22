import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from '../share/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../share/models/user';
import { fadeAnimation } from '../animations';
import { MatDialog } from '@angular/material';
import { VersionBoxComponent } from '../share/components/version-box/version-box.component';
import { FeedBackBoxComponent } from '../share/components/feedBack-box/feedBack-box.component';
import { UserService } from '../share/services/user.service';
import { Result } from '../share/models/result';

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
    private dialog: MatDialog
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
    // set active parent tab
    if (
      this.currentUrl === '/class/classes/teams' ||
      this.currentUrl === '/class/classes/members'
    ) {
      this.teamParentsTab = true;
    }
    if (
      this.currentUrl === '/class/exercises' ||
      this.currentUrl === '/class/schedule'
    ) {
      this.exerciseParentsTab = true;
    }
  }
  goToProfile() {
    this.router.navigate(['/class/profiles']);
  }
  openVersionDialog() {
    this.dialog.open(VersionBoxComponent, {
      panelClass: 'version-box'
    });
  }
  openFeedBackDialog() {
    this.dialog.open(FeedBackBoxComponent, {
      panelClass: 'feedback-box'
    });
  }
  logout() {
    this.authService.logout();
  }
}
