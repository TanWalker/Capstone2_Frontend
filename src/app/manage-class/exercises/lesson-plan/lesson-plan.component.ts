import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { Result } from 'src/app/share/models/result';
import { ManageLessonPlanService } from 'src/app/share/services/manageLessonPlan.service';
import { Exercise } from 'src/app/share/models/exercise';

@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.component.html',
  styleUrls: [
    './lesson-plan.component.css',
    '../../../app.component.css',
    './../../manage-class.component.css'
  ]
})
export class LessonPlanComponent implements OnInit {

  public isMobile = false;
  public typeExs: any;
  public subTypeExs: any;
  public exercises: Exercise[] = [];
  constructor(
    public deviceService: DeviceDetectorService,
    private exerciseService: ExerciseService,
    private manageLessonPlanService: ManageLessonPlanService
  ) {
    this.isMobile = deviceService.isMobile();
   }

  ngOnInit() {
    this.getListTypeOfExercises();
    this.autoGetListExerViaRXJ();
  }

  getListTypeOfExercises() {
    this.subTypeExs = this.exerciseService.getTypeOfExercise().subscribe(
        (data: Result) => {
          this.typeExs = data.success ? data.values : [];
        }
    );
  }
  autoGetListExerViaRXJ() {
    this.manageLessonPlanService.getExercises().subscribe(
      (data) => {
      this.exercises = data;
      }
    );
  }
  removeEx($event: Exercise) {
    this.manageLessonPlanService.removeExercise($event);
  }
}
