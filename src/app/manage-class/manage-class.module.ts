import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassComponent } from './manage-class.component';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassesComponent } from './classes/classes.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ClassComponent } from './components/class/class.component';
import { AddClassComponent } from './dialogs/add-class/add-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ScheduleComponent } from './exercises/schedule/schedule.component';
import { AddExerciseComponent } from './exercises/dialogs/add-exercise/add-exercise.component';
import { ExerciseComponent } from './exercises/components/exercise/exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail/exercise-detail.component';
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
    ProfilesComponent,
    ClassComponent,
    AddClassComponent,
    ScheduleComponent,
    AddExerciseComponent,
    ExerciseComponent,
    ExercisesComponent,
    ExerciseDetailComponent
  ],
  entryComponents: [
    AddClassComponent,
    AddExerciseComponent
  ],
  providers: [
    DatePipe
  ]
})
export class ManageClassModule {}
