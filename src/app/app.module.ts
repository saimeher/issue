import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { RouterModule, Routes, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { ApiService } from './api.service';
// import {ApiiService} from './apii.service';
 import {UrlService} from './url.service';
// import {DataService} from './data.service';
//import {AuthGuard} from './authentication';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewIssuesComponent } from './view-issues/view-issues.component';
import {DataTableModule} from "angular2-datatable";
import {DataFilterPipe} from './datatable-filter';
import {DateComponent} from './date/date.component';
import {AuthGuard} from './authentication';
// import { DatesComponent } from './dates/dates.component';
import {  ModalComponent } from './modal.component';
//import { RaiseIssueComponent } from './raise-issue/raise-issue.component';
 import { AddissueComponent } from './addissue/addissue.component';
import { DatePickerModule } from "../datepicker/index";
import { OverlayModule } from "angular-io-overlay";
import { MyissuesListComponent } from './myissues-list/myissues-list.component';
import { MyDatePickerModule } from 'mydatepicker';
import { UploadService} from './upload.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeftmenuComponent,
    HeaderComponent,
    DashboardComponent,
    ViewIssuesComponent,
    DataFilterPipe,
    DateComponent,
    ModalComponent,
    //RaiseIssueComponent,
     AddissueComponent,
    MyissuesListComponent
   // UrlService,
    // DataService,
   // AuthGuard,
   // ApiiService
    //routing
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    routing,
    DataTableModule,
    OverlayModule,
    DatePickerModule,
    MyDatePickerModule
  ],
  providers: [ApiService,UrlService,AuthGuard,UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
