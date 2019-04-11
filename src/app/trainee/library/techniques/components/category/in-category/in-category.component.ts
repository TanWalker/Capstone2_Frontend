import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-in-category',
  templateUrl: './in-category.component.html',
  styleUrls: ['./in-category.component.css']
})
export class InCategoryComponent implements OnInit {
  public idStyle: String;
  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => this.idStyle = params.id);
  }

  ngOnInit() {}
}
