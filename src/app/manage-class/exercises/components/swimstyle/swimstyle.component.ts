import { Component, OnInit, Input } from '@angular/core';
import { SwimStyle } from 'src/app/share/models/swimStyle';

@Component({
  selector: 'app-swimstyle',
  templateUrl: './swimstyle.component.html',
  styleUrls: ['./swimstyle.component.css', '../../../../app.component.css']
})
export class SwimstyleComponent implements OnInit {
  @Input() style: SwimStyle;
  @Input() last: any;
  constructor() {}

  ngOnInit() {
    console.log(this.last);
  }
}
