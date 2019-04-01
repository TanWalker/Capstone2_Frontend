import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/share/services/auth.service';
import { UserService } from 'src/app/share/services/user.service';
import { Result } from 'src/app/share/models/result';
import { User } from 'src/app/share/models/user';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  // public
  public subUsers: any;
  public users: User [] = [];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
   this.subUsers = this.userService.getAllExistingTrainee().subscribe(
      (data: Result) => {
          console.log(data);
      }
   );
  }

}
