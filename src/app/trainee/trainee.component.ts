import { Component, OnInit } from '@angular/core';
import { User } from '../share/models/user';
import { AuthService } from '../share/services/auth.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css']
})
export class TraineeComponent implements OnInit {
  public user: User = new User();
  constructor(
    private authService: AuthService
  ) {
    this.user = authService.currentUser;
  }

  ngOnInit() {
    console.log(this.user);
  }

}
