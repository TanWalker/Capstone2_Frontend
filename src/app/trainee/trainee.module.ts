import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineeComponent } from './trainee.component';
import { TraineeTabBarComponent } from './components/trainee-tab-bar/trainee-tab-bar.component';
import { MaterialModule } from '../material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule, DateAdapter } from '@angular/material';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StatsComponent } from './stats/stats.component';
import { ChartsModule } from 'ng2-charts';
import { TraineeProfilesComponent } from './trainee-profiles/trainee-profiles.component';
import { ExerciseComponent } from './stats/components/exercise/exercise.component';
import { RecordByMonthYearComponent } from './stats/record-by-month-year/record-by-month-year.component';
import { RecordByYearComponent } from './stats/record-by-year/record-by-year.component';
import { RecordDetailComponent } from './stats/dialogs/record-detail/record-detail.component';
// tslint:disable-next-line:max-line-length
import { RecordByMonthYearExComponent } from './stats/record-by-month-year/components/record-by-month-year-ex/record-by-month-year-ex.component';
import { TechniquesComponent } from './library/techniques/techniques.component';
import { NutritionComponent } from './library/nutrition/nutrition.component';
import { YoutubeVideoComponent } from './library/techniques/components/youtube-video/youtube-video.component';
import { CategoryComponent } from './library/techniques/components/category/category.component';
import { InCategoryComponent } from './library/techniques/components/category/in-category/in-category.component';
import { TraineeScheduleComponent } from './trainee-schedule/trainee-schedule.component';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    MatTooltipModule,
    FormsModule,
    UcWidgetModule,
    ChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [
    ExerciseComponent,
    YoutubeVideoComponent,
    RecordByMonthYearExComponent,
    CategoryComponent,
    InCategoryComponent
  ],
  declarations: [
    TraineeComponent,
    TraineeTabBarComponent,
    StatsComponent,
    TraineeProfilesComponent,
    ExerciseComponent,
    RecordByMonthYearComponent,
    RecordByYearComponent,
    RecordDetailComponent,
    RecordByMonthYearExComponent,
    TechniquesComponent,
    NutritionComponent,
    YoutubeVideoComponent,
    CategoryComponent,
    InCategoryComponent,
    TraineeScheduleComponent
  ],
  entryComponents: [RecordDetailComponent]
})
export class TraineeModule {}
