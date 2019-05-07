import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassComponent } from './manage-class.component';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassesComponent } from './classes/classes.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ClassComponent } from './components/class/class.component';
import { AddClassComponent } from './dialogs/add-class/add-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ScheduleComponent } from './exercises/schedule/schedule.component';
import { AddExerciseComponent } from './exercises/dialogs/add-exercise/add-exercise.component';
import { ExerciseComponent } from './exercises/components/exercise/exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail/exercise-detail.component';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MemberComponent } from './components/class/member/member.component';
import { AddScheduleComponent } from './exercises/dialogs/add-schedule/add-schedule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditClassComponent } from './dialogs/edit-class/edit-class.component';
import { SwimstylesComponent } from './exercises/dialogs/swimstyles/swimstyles.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SwimstyleComponent } from './exercises/components/swimstyle/swimstyle.component';
import { MembersOfTeamComponent } from './components/members-of-team/members-of-team.component';
import { MemberOfTeamComponent } from './components/members-of-team/member-of-team/member-of-team.component';
import { DistancesComponent } from './exercises/dialogs/distances/distances.component';
import { DistanceComponent } from './exercises/components/distance/distance.component';
import { DetailScheduleComponent } from './exercises/dialogs/detail-schedule/detail-schedule.component';
import { RecordComponent } from './record/record.component';
import { LessonPlanComponent } from './exercises/lesson-plan/lesson-plan.component';
import { ChartsModule } from 'ng2-charts';
import { SingleRecordComponent } from './record/components/single-record/single-record.component';
import { AddMemberComponent } from './dialogs/add-member/add-member.component';
import { RankingComponent } from './dialogs/ranking/ranking.component';
import { AddVideoComponent } from './library/dialogs/add-video/add-video.component';
import { TechniquesComponent } from './library/techniques/techniques.component';
import { CategoryComponent } from './library/techniques/components/category/category.component';
import { VideoRowComponent } from './library/techniques/components/video-row/video-row.component';
import { NutritionComponent } from './library/nutrition/nutrition.component';
import { AddNutritionComponent } from './library/nutrition/dialogs/add-nutrition/add-nutrition.component';
import { NutritionRowComponent } from './library/nutrition/components/nutrition-row/nutrition-row.component';
import { StyleRankComponent } from './dialogs/ranking/components/style-rank/style-rank.component';
import { ExerciseRankComponent } from './dialogs/ranking/components/exercise-rank/exercise-rank.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    FormsModule,
    UcWidgetModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ChartsModule
  ],
  declarations: [
    ManageClassComponent,
    ClassesComponent,
    TabBarComponent,
    ProfilesComponent,
    ClassComponent,
    AddClassComponent,
    ScheduleComponent,
    AddExerciseComponent,
    ExerciseComponent,
    SwimstyleComponent,
    ExercisesComponent,
    ExerciseDetailComponent,
    MemberComponent,
    SingleRecordComponent,
    AddScheduleComponent,
    EditClassComponent,
    DetailScheduleComponent,
    SwimstylesComponent,
    DistanceComponent,
    MembersOfTeamComponent,
    MemberOfTeamComponent,
    DistancesComponent,
    RecordComponent,
    LessonPlanComponent,
    AddMemberComponent,
    RankingComponent,
    AddVideoComponent,
    TechniquesComponent,
    CategoryComponent,
    VideoRowComponent,
    NutritionComponent,
    AddNutritionComponent,
    NutritionRowComponent,
    StyleRankComponent,
    ExerciseRankComponent
  ],
  entryComponents: [
    AddClassComponent,
    AddExerciseComponent,
    AddScheduleComponent,
    EditClassComponent,
    SwimstylesComponent,
    DistancesComponent,
    DetailScheduleComponent,
    AddMemberComponent,
    RankingComponent,
    AddVideoComponent,
    CategoryComponent,
    VideoRowComponent,
    AddNutritionComponent,
    NutritionRowComponent,
    StyleRankComponent,
    ExerciseRankComponent
  ],
  providers: [DatePipe]
})
export class ManageClassModule {}
