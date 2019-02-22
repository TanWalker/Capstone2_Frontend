import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';


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
