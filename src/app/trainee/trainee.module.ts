import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineeComponent } from './trainee.component';
import { TraineeTabBarComponent } from './components/trainee-tab-bar/trainee-tab-bar.component';
import { MaterialModule } from '../material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  declarations: [TraineeComponent, TraineeTabBarComponent, ProfilesComponent]
})
export class TraineeModule {}
