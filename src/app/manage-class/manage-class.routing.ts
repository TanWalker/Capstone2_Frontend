import { Routes, RouterModule } from '@angular/router';
import { ManageClassComponent } from './manage-class.component';
import { NgModule } from '@angular/core';
import { ClassesComponent } from './classes/classes.component';
import { EditComponent } from './classes/edit/edit.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { UserGuard } from '../share/guards/user.guard';
import { LessonPlansComponent } from './lesson-plans/lesson-plans.component';
import { ScheduleComponent } from './lesson-plans/schedule/schedule.component';
import { LessonPlanDetailComponent } from './lesson-plans/lesson-plan-detail/lesson-plan-detail.component';
const routes: Routes = [
  {
    path: 'class',
    component: ManageClassComponent,
    // canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: 'classes', pathMatch: 'full' },
      { path: 'classes', component: ClassesComponent },
      { path: 'classes/edit', component: EditComponent },
      { path: 'profiles', component: ProfilesComponent },
      { path: 'lessonplan', component: LessonPlansComponent },
      { path: 'lessonplan/plan/:id', component: LessonPlanDetailComponent },
      { path: 'lessonplan/schedule', component: ScheduleComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageClassRoutes {}
