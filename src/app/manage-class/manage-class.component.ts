import { Component, OnInit } from '@angular/core';
import { VersionService } from '../share/services/version.service';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit {

  constructor(
   private versionService: VersionService
  ) { }

  ngOnInit() {
    this.getVersion();
  }
  getVersion() {
    this.versionService.getVersion().subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
