import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/share/models/member';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css', './../../../manage-class.component.css']
})
export class MemberComponent implements OnInit {
  @Input() member: Member;
  constructor() {}

  ngOnInit() {}
}
