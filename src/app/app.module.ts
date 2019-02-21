import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { ManageClassRoutes } from './manage-class/manage-class.routing';
import { ManageClassModule } from './manage-class/manage-class.module';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './manage-class/edit/edit.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { ConfirmDialogComponent } from './manage-class/manage-class.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    TabBarComponent,
    ConfirmDialogComponent
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
    ConfirmDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
