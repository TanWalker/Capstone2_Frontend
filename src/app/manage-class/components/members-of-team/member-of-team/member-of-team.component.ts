import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/share/models/user';
import { Constants } from 'src/app/share/constants';

const constant = {
  default: {
    member: {
      phone: Constants.default.member.phone,
      address: Constants.default.member.address,
      height: Constants.default.member.height,
      weight: Constants.default.member.weight,
      avatar: Constants.default.member.avatar,
    },
  }
};
@Component({
  selector: 'app-member-of-team',
  templateUrl: './member-of-team.component.html',
  styleUrls: ['./member-of-team.component.css']
})

export class MemberOfTeamComponent implements OnInit {

  @Input() member: User;
  public message = constant;
  constructor() { }

  ngOnInit() {
  }

}
