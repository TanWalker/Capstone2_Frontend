import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineeComponent } from './trainee.component';
import { TraineeTabBarComponent } from './components/trainee-tab-bar/trainee-tab-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TraineeComponent, TraineeTabBarComponent]
})
export class TraineeModule {}
