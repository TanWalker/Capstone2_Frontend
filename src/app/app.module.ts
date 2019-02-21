import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { ManageClassRoutes } from './manage-class/manage-class.routing';
import { ManageClassModule } from './manage-class/manage-class.module';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './manage-class/edit/edit.component';
import { MessageBoxComponent } from './share/components/message-box/message-box.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { LoginComponent } from './share/components/login/login.component';
import { RegisterComponent } from './share/components/register/register.component';
import { ConfirmDialogComponent } from './manage-class/classes/classes.component';
@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ProfilesComponent,
    ConfirmDialogComponent,
    MessageBoxComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ManageClassModule,
    AppRoutes,
    MaterialModule,
    ManageClassRoutes,
    HttpClientModule,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    MessageBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
