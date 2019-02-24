import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Result } from '../../models/result';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../app.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User = new User();
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  regis() {
      this.userService.regis(this.user).subscribe(
        (res: Result) => {
            console.log(res);
        }
      );
  }
}
