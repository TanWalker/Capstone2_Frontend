import { Routes, RouterModule } from '@angular/router';
import { ManageClassComponent } from './manage-class.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'class',
    component: ManageClassComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageClassRoutes { }
