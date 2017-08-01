import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
// import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { DateComponent } from '../date/date.component';
import { ModalComponent } from '../modal.component';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
@Component({
  selector: 'app-view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.css']
})
export class ViewIssuesComponent implements OnInit {
  @ViewChild('modal1') modal1: ModalComponent;
  @ViewChild('day') dayElement: ElementRef;
  issues_form: FormGroup;
  issuesList;
  categoriesList;
  table = false;
  id;
  on;
  by;
  resolution;
  notes;
  start_date;
  end_date;
  data2;

  today = new Date();
  //data:any;
  role = localStorage.getItem('role');
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
  constructor(public api: ApiService, public fb: FormBuilder) { }

  ngOnInit() {
    this.issues_form = this.fb.group({
      seluserid: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      selstatus: ['', Validators.required]


    });
    console.log('date', this.from_date)
    // this.getIssuesList();
    console.log(this.role);
    if (this.role == 'adm') {
      this.getAllIssues();
    }
    this.getCategories();
  }
  total;
  verified_resolved_tot;
  resolution_in_progress_tot;
  pending_tot;
  user_deleted_tot;
  cannot_be_resolved_tot;
  getAllIssues() {
    this.verified_resolved_tot = '';
    this.resolution_in_progress_tot = '';
    this.pending_tot = '';
    this.user_deleted_tot = '';
    this.cannot_be_resolved_tot = '';
    this.total = '';
    this.api.getAllIssues().subscribe(alldata => {
      if (alldata) {
        console.log(alldata.data);
        console.log(alldata.data1);
        this.data2 = alldata.data1;
        this.data = alldata.data;
        if (this.data2 == 'NoData') {
          this.table = true;
        } else {
          this.table = false;
          console.log(this.data2);
          this.data2.forEach(element => {
            this.total = element.t;
            if (element.status == 'cannot_be_resolved') {
              this.cannot_be_resolved_tot = element.tot;
            }
            if (element.status == 'pending') {
              this.pending_tot = element.tot;
            }
            if (element.status == 'resolution_in_progress') {
              this.resolution_in_progress_tot = element.tot;
            }
            if (element.status == 'user_deleted') {
              this.user_deleted_tot = element.tot;
            }
            if (element.status == 'verified_resolved') {
              this.verified_resolved_tot = element.tot;
            }
            console.log(element.status, '-', element.tot);

          });
        }
        //  this.data2.forEach(element => {

        //    this.total=element.t;
        //  });
      }
    })
  }

  getCategories() {
    this.api.getCategories().subscribe(categories => {
      if (categories) {
        console.log(categories);

        this.categoriesList = categories;
      }
    })
  }
  problem;
  raised_by;
  date;
  location;
  issue;
  details(item) {
    console.log(item);

    this.date = item.insert_dt;
    this.raised_by = item.raised_by;
    this.problem = item.problem;
    this.location = item.location;
    this.issue = item.issue_desc;
    this.id = item.did;
    this.on = item.repaired_on;
    this.by = item.repaired_by;
    this.resolution = item.date_of_resolution;
    this.notes = item.notes;
    this.modal1.show();
  }

  selCategory($event) {
    this.data = '';
    this.total = '';
    this.verified_resolved_tot = '';
    this.resolution_in_progress_tot = '';
    this.pending_tot = '';
    this.user_deleted_tot = '';
    this.cannot_be_resolved_tot = '';
    console.log('his', $event.target.value);
    let value = $event.target.value;
    if (value == 'all') {
      // console.log('jsod');
      this.getAllIssues();

    } else {
      this.api.getIssuesListbyCategory(value).subscribe(sellist => {
        if (sellist) {
          console.log(sellist.data);
          this.data = sellist.data;
          this.data2 = sellist.data1;
          if (this.data2 == 'NoData') {
            this.table = true;
          } else {
            this.table = false;
            console.log(this.data2);
            this.data2.forEach(element => {
              this.total = element.t;
              if (element.status == 'cannot_be_resolved') {
                this.cannot_be_resolved_tot = element.tot;
              }
              if (element.status == 'pending') {
                this.pending_tot = element.tot;
              }
              if (element.status == 'resolution_in_progress') {
                this.resolution_in_progress_tot = element.tot;
              }
              if (element.status == 'user_deleted') {
                this.user_deleted_tot = element.tot;
              }
              if (element.status == 'verified_resolved') {
                this.verified_resolved_tot = element.tot;
              }
            });
          }
          // this.data2.forEach(element => {

          //    this.total=element.t;
          //  });

        } else {
          this.data = '';
        }

      });
    }

  }
  from_date;
  to_date;
  // dateChanged(date,$event){
  //   switch(date){
  //     case  'start_date' :   this.from_date=$event;  break;
  //      case  'end_date' :   this.to_date=$event;  break;

  //   }
  //   console.log(this.from_date);
  //     console.log(this.to_date);
  //   }

  selection = {};
  getSelIssueData() {
    this.total = '';
    this.data = '';
    this.verified_resolved_tot = '';
    this.resolution_in_progress_tot = '';
    this.pending_tot = '';
    this.user_deleted_tot = '';
    this.cannot_be_resolved_tot = '';
    this.selection['category'] = this.issues_form.value.seluserid;
    this.selection['status'] = this.issues_form.value.selstatus;
    this.selection['from_date'] = this.from_date;
    this.selection['to_date'] = this.to_date;
    console.log(this.selection);
    this.api.getIssuesListBySelection(this.selection).subscribe(data => {
      if (data) {
        this.data = data.data;
        this.data2 = data.data1;
        if (this.data2 == 'NoData') {
          this.table = true;
        } else {
          this.table = false;
          console.log(this.data2);
          this.data2.forEach(element => {
            this.total = element.t;
            if (element.status == 'cannot_be_resolved') {
              this.cannot_be_resolved_tot = element.tot;
            }
            if (element.status == 'pending') {
              this.pending_tot = element.tot;
            }
            if (element.status == 'resolution_in_progress') {
              this.resolution_in_progress_tot = element.tot;
            }
            if (element.status == 'user_deleted') {
              this.user_deleted_tot = element.tot;
            }
            if (element.status == 'verified_resolved') {
              this.verified_resolved_tot = element.tot;
            }
          });
        }

      }
    })

  }

  clear() {
    this.issues_form.reset();

  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    disableWeekends: false,
    // disableDays: this.service.holidays,
    //  disableUntil: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() - 1 }
    // disableUntil: {year: , month: 5 , day: 17}

  };
  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    disableWeekends: false,

    //  disableDays: this.service.holidays,
    disableUntil: { year: 0, month: 0, day: 0 }
    // disableUntil: {year: , month: 5 , day: 17}

  };
  picker1day;
  picker1month;
  picker1year;

  onDateChanged(event: IMyDateModel) {

    this.from_date = event.formatted;
    this.myDatePickerOptions2.disableUntil.year = event.date.year
    this.myDatePickerOptions2.disableUntil.month = event.date.month
    this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
  }

  onDateChanged2(event: IMyDateModel) {
    console.log(this.to_date, 'from date test');
    this.to_date = event.formatted
  }

}
