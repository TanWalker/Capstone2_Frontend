import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from 'src/app/share/services/team.service';
import { Result } from 'src/app/share/models/result';

@Component({
  selector: 'app-exercise-rank',
  templateUrl: './exercise-rank.component.html',
  styleUrls: ['./exercise-rank.component.css']
})
export class ExerciseRankComponent implements OnInit {
  @Input() exercise;
  @Input() team;
  public top3;
  constructor(private teamService: TeamService) {}

  ngOnInit() {
    // console.log(this.team);
    // console.log(this.exercise);
    this.teamService
      .getRankByTeam(this.team.id, this.exercise.id)
      .subscribe((result: Result) => {
        if (result.success) {
          this.top3 = result.values;
          console.log(this.top3);
        }
        // console.log(result);
      });
  }
}
