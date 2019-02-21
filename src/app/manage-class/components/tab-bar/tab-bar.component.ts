import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css'],

})
export class TabBarComponent implements OnInit {
  currentUrl: string;
  constructor(private router: Router, private ActiveRoute: ActivatedRoute) {
    router.events.subscribe((_: NavigationEnd) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      if (_.url !== undefined) {
        this.currentUrl = _.url;
      }
      // console.log(this.ActiveRoute.snapshot.paramMap.get('id'));
    });
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // console.log(this.currentUrl);
      }
    });
  }

}
