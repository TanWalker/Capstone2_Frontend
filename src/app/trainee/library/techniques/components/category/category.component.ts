import { Component, OnInit, Input } from '@angular/core';
import { SwimStyle } from 'src/app/share/models/swimStyle';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() swimStyle: SwimStyle;
  constructor() {}

  ngOnInit() {}
}
