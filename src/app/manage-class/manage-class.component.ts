import { Component, OnInit } from '@angular/core';
import { DeviceDetectorModule } from 'ngx-device-detector';


@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit {

  deviceInfo = null;
  constructor(
    private deviceService: DeviceDetectorModule,
  ) {
    this.epicFunction();
  }
  epicFunction() {
    console.log('hello `Home` component');
    this.deviceService.isMobile();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }
  ngOnInit() {
  }
}
