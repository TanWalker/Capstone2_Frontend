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
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MemberComponent } from './components/class/member/member.component';
import { AddScheduleComponent } from './exercises/dialogs/add-schedule/add-schedule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditClassComponent } from './dialogs/edit-class/edit-class.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    UcWidgetModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
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
    ExerciseDetailComponent,
    MemberComponent,
    AddScheduleComponent,
    EditClassComponent
  ],
  entryComponents: [
    AddClassComponent,
    AddExerciseComponent,
    AddScheduleComponent,
    EditClassComponent
  ],
  providers: [DatePipe]
})
export class ManageClassModule {}
