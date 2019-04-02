import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { SwimStyle } from 'src/app/share/models/swimStyle';
import { Result } from 'src/app/share/models/result';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  public types: SwimStyle[] = [];
  public subTypes: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exerciseService: ExerciseService,
    private dialogRef: MatDialogRef<RankingComponent>
  ) { }

  ngOnInit() {
    this.subTypes = this.exerciseService.getAllStyle().subscribe(
      (data: Result) => {
        this.types = data.success ? data.values : [];
      }
    );
  }
  ngOnDestroy() {
    if ( this.subTypes !== null) { this.subTypes.unsubscribe(); }
  }

  cancel() {
    this.dialogRef.close();
  }
}
