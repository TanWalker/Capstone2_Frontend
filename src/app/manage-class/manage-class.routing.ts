import { Routes, RouterModule } from '@angular/router';
import { ManageClassComponent } from './manage-class.component';
import { NgModule } from '@angular/core';
import { ClassesComponent } from './classes/classes.component';
import { EditComponent } from './dialogs/edit/edit.component';
const routes: Routes = [
  {
    path: 'class',
    component: ManageClassComponent,
    children: [
      { path: '', redirectTo: 'classes', pathMatch: 'full' },
      {path: 'classes', component: ClassesComponent},
      {path: 'edit', component: EditComponent}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageClassRoutes { }
