import { Routes, RouterModule } from '@angular/router';
import { TraineeComponent } from './trainee.component';
import { UserGuard } from '../share/guards/user.guard';
import { NgModule } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { ProfilesComponent } from '../manage-class/profiles/profiles.component';
import { TraineeProfilesComponent } from './trainee-profiles/trainee-profiles.component';
import { RecordByMonthYearComponent } from './stats/record-by-month-year/record-by-month-year.component';
import { RecordByYearComponent } from './stats/record-by-year/record-by-year.component';
import { TechniquesComponent } from './library/techniques/techniques.component';
import { NutritionComponent } from './library/nutrition/nutrition.component';
import { InCategoryComponent } from './library/techniques/components/category/in-category/in-category.component';
const routes: Routes = [
  {
    path: 'trainee',
    component: TraineeComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: 'profiles', pathMatch: 'full' },
      { path: 'profiles', component: TraineeProfilesComponent },
      { path: 'profiles/settings', component: ProfilesComponent },
      { path: 'stats', component: StatsComponent },
      {
        path: 'stats/records-exercise-by-monthyear',
        component: RecordByMonthYearComponent
      },
      {
        path: 'stats/records-exercise-by-year',
        component: RecordByYearComponent
      },
      { path: 'library/techniques', component: TechniquesComponent },
      { path: 'library/techniques/:id', component: InCategoryComponent },
      { path: 'library/nutrition', component: NutritionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeRoutes {}
