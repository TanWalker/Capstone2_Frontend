import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineeComponent } from './trainee.component';
import { TraineeTabBarComponent } from './components/trainee-tab-bar/trainee-tab-bar.component';
import { MaterialModule } from '../material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StatsComponent } from './stats/stats.component';
import { ChartsModule } from 'ng2-charts';
import { TraineeProfilesComponent } from './trainee-profiles/trainee-profiles.component';
import { ExerciseComponent } from './stats/components/exercise/exercise.component';
import { RecordByMonthYearComponent } from './stats/record-by-month-year/record-by-month-year.component';
import { RecordByYearComponent } from './stats/record-by-year/record-by-year.component';
import { RecordDetailComponent } from './stats/dialogs/record-detail/record-detail.component';
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
    ChartsModule
  ],
  exports: [
    ExerciseComponent
  ],
  declarations: [
    TraineeComponent,
    TraineeTabBarComponent,
    StatsComponent,
    TraineeProfilesComponent,
    ExerciseComponent,
    RecordByMonthYearComponent,
    RecordByYearComponent,
    RecordDetailComponent
  ],
  entryComponents: [
    RecordDetailComponent
  ]
})
export class TraineeModule {}
