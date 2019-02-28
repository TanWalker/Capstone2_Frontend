import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassComponent } from './manage-class.component';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassesComponent } from './classes/classes.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { EditComponent } from './classes/edit/edit.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ClassComponent } from './components/class/class.component';
import { AddClassComponent } from './dialogs/add-class/add-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonPlansComponent } from './lesson-plans/lesson-plans.component';
import { ScheduleComponent } from './lesson-plans/schedule/schedule.component';
import { LessonPlanComponent } from './lesson-plans/components/lesson-plan/lesson-plan.component';
import { AddLessonComponent } from './lesson-plans/dialogs/add-lesson/add-lesson.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ManageClassComponent,
    ClassesComponent,
    TabBarComponent,
    EditComponent,
    ProfilesComponent,
    ClassComponent,
    AddClassComponent,
    AddLessonComponent,
    LessonPlansComponent,
    ScheduleComponent,
    LessonPlanComponent
  ],
  entryComponents: [
    AddClassComponent,
    AddLessonComponent
  ],
})
export class ManageClassModule {}
