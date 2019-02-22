import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from '../share/services/auth.service';


@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit {

  isMobile = false;
  constructor(
    private deviceService: DeviceDetectorService,
  ) {
   this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
  }
}
