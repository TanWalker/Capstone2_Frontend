import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/share/services/auth.service';
import { User } from 'src/app/share/models/user';

@Component({
  selector: 'app-trainee-profiles',
  templateUrl: './trainee-profiles.component.html',
  styleUrls: [
    './trainee-profiles.component.css',
    './../../manage-class/manage-class.component.css',
    './../../app.component.css'
  ]
})
export class TraineeProfilesComponent implements OnInit {
  public user: User = new User();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }
}
