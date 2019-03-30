import { Component, OnInit } from '@angular/core';
import { User } from '../share/models/user';
import { AuthService } from '../share/services/auth.service';
import { Router } from '@angular/router';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css', './../app.component.css'],
  animations: [fadeAnimation]
})
export class TraineeComponent implements OnInit {
  public user: User = new User();
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (authService.isCoach()) {
      this.router.navigate(['/class']);
    }
    this.user = authService.currentUser;
  }

  ngOnInit() {
    console.log(this.user);
  }

}
