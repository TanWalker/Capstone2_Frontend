import { Component, OnInit } from '@angular/core';
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
  constructor() { }
  genders: Gender[] = [
    { value: '0', viewValue: 'Nam' },
    { value: '1', viewValue: 'Nữ' },
  ];
  ngOnInit() {
  }

}
