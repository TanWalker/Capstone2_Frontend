import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from 'src/app/share/services/auth.service';
import { DatePipe } from '@angular/common';
export interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: [
    './profiles.component.scss',
    './../manage-class.component.css',
    './../../app.component.css'
  ]
})
export class ProfilesComponent implements OnInit {
  isMobile = null;
  user = this.authService.currentUser;
  dob = this.datepipe.transform(this.user.dob, 'yyyy-MM-dd');

  constructor(
    private deviceService: DeviceDetectorService,
    private authService: AuthService,
    private datepipe: DatePipe
  ) {}
  genders: Gender[] = [
    { value: '0', viewValue: 'Nam' },
    { value: '1', viewValue: 'Nữ' }
  ];
  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    console.log();
  }
  updateAvatar( $info) {
    console.log($info);
  }
  logout() {
    this.authService.logout();
  }
}
