import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/share/services/auth.service';
import { User } from 'src/app/share/models/user';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {
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
