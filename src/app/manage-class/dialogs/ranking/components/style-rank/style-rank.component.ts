import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/share/models/exercise';
import { TeamService } from 'src/app/share/services/team.service';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-style-rank',
  templateUrl: './style-rank.component.html',
  styleUrls: ['./style-rank.component.css']
})
export class StyleRankComponent implements OnInit {
  @Input() style: any;
  @Input() team;
  public exercises;
  public style_name: String = '';
  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.style_name = Object.keys(this.style)[0];
    // console.log(this.style[this.style_name.toString()]);
    this.exercises = this.style[this.style_name.toString()];
    // console.log(this.exercises);
  }
}
