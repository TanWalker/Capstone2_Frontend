import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/share/models/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/share/services/auth.service';

@Component({
  selector: 'app-trainee-tab-bar',
  templateUrl: './trainee-tab-bar.component.html',
  styleUrls: ['./trainee-tab-bar.component.css']
})
export class TraineeTabBarComponent implements OnInit {
  currentUrl: string;
  public user: User = new User();
  constructor(
    private router: Router,
    private ActiveRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    router.events.subscribe((_: NavigationEnd) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      if (_.url !== undefined) {
        this.currentUrl = _.url;
      }
      // console.log(this.ActiveRoute.snapshot.paramMap.get('id'));
    });
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.currentUrl = this.router.url;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // console.log(this.currentUrl);
      }
    });
  }
}
