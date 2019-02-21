import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfilesComponent } from './profiles/profiles.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'class', pathMatch: 'full'
  },
  {
    path: 'profiles', component: ProfilesComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
