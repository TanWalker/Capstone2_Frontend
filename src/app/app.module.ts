import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { ManageClassRoutes } from './manage-class/manage-class.routing';
import { ManageClassModule } from './manage-class/manage-class.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageBoxComponent } from './share/components/message-box/message-box.component';
import { LoginComponent } from './share/components/login/login.component';
import { RegisterComponent } from './share/components/register/register.component';
import { ConfirmDialogComponent } from './manage-class/classes/classes.component';
import { AuthInterceptor } from './share/interceptors/auth-interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
@NgModule({
  declarations: [
    AppComponent,
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
    ReactiveFormsModule,
    FormsModule,
    DeviceDetectorModule.forRoot()

  ],
  entryComponents: [
    ConfirmDialogComponent,
    MessageBoxComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
