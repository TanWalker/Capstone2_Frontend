import { Component, OnInit, OnDestroy } from '@angular/core';
import { VersionService } from '../../services/version.service';
import { Result } from '../../models/result';
import { Version } from '../../models/version';

@Component({
  selector: 'app-version-box',
  templateUrl: './version-box.component.html',
  styleUrls: ['./version-box.component.css']
})
export class VersionBoxComponent implements OnInit, OnDestroy {
  public version: Version = new Version();
  public subVersion: any;
  constructor(private versionService: VersionService) {}

  ngOnInit() {
    this.getVersionApp();
  }
  ngOnDestroy() {
    if (this.subVersion !== null) {
      this.subVersion.unsubscribe();
    }
  }
  getVersionApp() {
    this.subVersion = this.versionService
      .getAppVersion()
      .subscribe((res: Result) => {
        // console.log(res);
        this.version = res.success ? res.value : '';
      });
  }
}
