import { Component, OnInit, Input } from '@angular/core';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { AuthService } from 'src/app/share/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() swimStyle: SwimStyle;
  @Input() color;
  public authUser;
  constructor(private authService: AuthService) {
    this.authUser = authService;
  }

  ngOnInit() {}
}
