import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassComponent } from './manage-class.component';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassesComponent } from './classes/classes.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { EditComponent } from './dialogs/edit/edit.component';
import { ProfilesComponent } from './profiles/profiles.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    ManageClassComponent,
    ClassesComponent,
    TabBarComponent,
    EditComponent,
    ProfilesComponent
  ]
})
export class ManageClassModule {}
