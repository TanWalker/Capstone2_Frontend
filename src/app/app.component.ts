import { Component, OnInit } from '@angular/core';
import { AuthService } from './share/services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isMobile = null;
  constructor(
    private deviceService: DeviceDetectorService,
    private authService: AuthService
  ) {
    const openLoading = true;
  }
  ngOnInit() {
    this.authService.autoGetCurrentUser();
    this.isMobile = this.deviceService.isMobile();
  }
}
