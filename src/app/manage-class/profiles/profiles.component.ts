import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

export interface Gender {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})

export class ProfilesComponent implements OnInit {
  isMobile = null;
  constructor(private deviceService: DeviceDetectorService) { }
  genders: Gender[] = [
    { value: '0', viewValue: 'Nam' },
    { value: '1', viewValue: 'Nữ' },
  ];
  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }

}
