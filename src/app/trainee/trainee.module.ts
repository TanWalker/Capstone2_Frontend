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
  declarations: [TraineeComponent, TraineeTabBarComponent, StatsComponent, TraineeProfilesComponent]
})
export class TraineeModule {}
