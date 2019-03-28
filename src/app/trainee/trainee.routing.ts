import { Routes, RouterModule } from '@angular/router';
import { TraineeComponent } from './trainee.component';
import { UserGuard } from '../share/guards/user.guard';
import { NgModule } from '@angular/core';
const routes: Routes = [
  {
    path: 'trainee',
    component: TraineeComponent,
    canActivate: [UserGuard],
    children: [
      // { path: '', redirectTo: 'profiles', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeRoutes {}
