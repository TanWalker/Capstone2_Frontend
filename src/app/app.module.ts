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
import { AuthInterceptor } from './share/interceptors/auth-interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LayoutModule } from '@angular/cdk/layout';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { VersionBoxComponent } from './share/components/version-box/version-box.component';
import { FeedBackBoxComponent } from './share/components/feedBack-box/feedBack-box.component';
import { ChartsModule } from 'ng2-charts';
import { TraineeModule } from './trainee/trainee.module';
import { TraineeRoutes } from './trainee/trainee.routing';

@NgModule({
   declarations: [
      AppComponent,
      MessageBoxComponent,
      LoginComponent,
      RegisterComponent,
      VersionBoxComponent,
      FeedBackBoxComponent,
   ],
   imports: [
      BrowserModule,
      ManageClassModule,
      TraineeModule,
      TraineeRoutes,
      AppRoutes,
      MaterialModule,
      ManageClassRoutes,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      DeviceDetectorModule.forRoot(),
      LayoutModule,
      UcWidgetModule,
      ChartsModule
   ],
   entryComponents: [
      MessageBoxComponent,
      VersionBoxComponent,
      FeedBackBoxComponent
   ],
   providers: [
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
