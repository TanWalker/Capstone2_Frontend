import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from '../share/services/auth.service';
import { ActivatedRoute, Router , NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit {

  isMobile = null;
  currentUrl: string;
  constructor(
    private deviceService: DeviceDetectorService,
    private ActiveRoute: ActivatedRoute,
    private router: Router
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
    this.isMobile = this.deviceService.isMobile();
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // console.log(this.currentUrl);
      }
    });
  }
}
