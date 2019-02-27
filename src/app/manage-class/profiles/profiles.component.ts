import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from 'src/app/share/services/auth.service';

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
  constructor(
    private deviceService: DeviceDetectorService,
    private authService: AuthService
  ) {}
  genders: Gender[] = [
    { value: '0', viewValue: 'Nam' },
    { value: '1', viewValue: 'Nữ' }
  ];
  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }
  logout() {
    this.authService.logout();
  }
}
