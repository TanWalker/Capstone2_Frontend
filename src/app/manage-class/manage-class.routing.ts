import { Routes, RouterModule } from '@angular/router';
import { ManageClassComponent } from './manage-class.component';
import { NgModule } from '@angular/core';
import { ClassesComponent } from './classes/classes.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { UserGuard } from '../share/guards/user.guard';
import { ScheduleComponent } from './exercises/schedule/schedule.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail/exercise-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { MembersOfTeamComponent } from './components/members-of-team/members-of-team.component';
import { RecordComponent } from './record/record.component';
import { TechniquesComponent } from '../trainee/library/techniques/techniques.component';
import { InCategoryComponent } from '../trainee/library/techniques/components/category/in-category/in-category.component';
const routes: Routes = [
  {
    path: 'class',
    component: ManageClassComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: 'classes/teams', pathMatch: 'full' },
      { path: 'classes/teams', component: ClassesComponent },
      { path: 'classes/members', component: MembersOfTeamComponent },
      { path: 'profiles', component: ProfilesComponent },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'exercises/detail/:id', component: ExerciseDetailComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'record', component: RecordComponent },
      { path: 'library/techiques', component: TechniquesComponent },
      { path: 'library/techniques/:id', component: InCategoryComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageClassRoutes {}
