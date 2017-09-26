import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import {CalendarModule} from 'primeng/primeng';
import { AddroleComponent } from './addrole/addrole.component';
import { AddDomainComponent } from './add-domain/add-domain.component';
import {MultiSelectModule} from 'primeng/primeng';

 declare var require: any;

export function highchartsFactory() {

  var hc = require('highcharts');
    var hcm = require('highcharts/highcharts-more');
    var exp = require('highcharts/modules/drilldown');
    var sg = require('highcharts/modules/solid-gauge');

    hcm(hc);
    exp(hc);
    sg(hc);
    return hc;
}
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
    MyissuesListComponent,
  AddroleComponent,
    AddDomainComponent
   // UrlService,
    // DataService,
   // AuthGuard,
   // ApiiService
    //routing
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    routing,
    DataTableModule,
    OverlayModule,
    DatePickerModule,
    //ChartModule.forRoot(require('highcharts')),
    MyDatePickerModule ,
    ChartModule,
    CalendarModule,
    MultiSelectModule
    
  ],
  providers: [ApiService,UrlService,AuthGuard,UploadService,{ provide: HighchartsStatic,
      useFactory: highchartsFactory}],
  bootstrap: [AppComponent]
})
export class AppModule {
    
 }
