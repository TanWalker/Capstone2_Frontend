import { Routes, RouterModule } from '@angular/router';
import { ManageClassComponent } from './manage-class.component';
import { NgModule } from '@angular/core';
import { ClassesComponent } from './classes/classes.component';
import { EditComponent } from './classes/edit/edit.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { UserGuard } from '../share/guards/user.guard';
import { ScheduleComponent } from './exercises/schedule/schedule.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail/exercise-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';
const routes: Routes = [
  {
    path: 'class',
    component: ManageClassComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: 'classes', pathMatch: 'full' },
      { path: 'classes', component: ClassesComponent },
      { path: 'classes/edit', component: EditComponent },
      { path: 'profiles', component: ProfilesComponent },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'exercises/detail/:id', component: ExerciseDetailComponent },
      { path: 'exercises/schedule', component: ScheduleComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageClassRoutes {}
