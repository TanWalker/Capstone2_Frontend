import { Routes, RouterModule } from '@angular/router';
import { TraineeComponent } from './trainee.component';
import { UserGuard } from '../share/guards/user.guard';
import { NgModule } from '@angular/core';
import { ProfilesComponent } from './profiles/profiles.component';
const routes: Routes = [
  {
    path: 'trainee',
    component: TraineeComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: 'profiles', pathMatch: 'full' },
      { path: 'profiles', component: ProfilesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeRoutes {}
