import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApiService } from '../api.service';
import { DateComponent } from '../date/date.component';
import { ModalComponent } from '../modal.component';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
@Component({
  selector: 'app-myissues-list',
  templateUrl: './myissues-list.component.html',
  styleUrls: ['./myissues-list.component.css']
})
export class MyissuesListComponent implements OnInit {
  @ViewChild('modal1') modal1: ModalComponent;
  @ViewChild('modal3') modal3: ModalComponent;
  taskeditForm: FormGroup;
  issues_form: FormGroup;
  role;
  data1;
  id;
  data2;
  data;
  data3;
  from_date;
  to_date;
  domain;
  sellist
  value1;
  repaired_onn;
  date_of_resolutionn;
  AC = [];
  AC_LENGTH;
  ELECTRICAL = [];
  CIVIL = [];
  WATER_SUPPLY = [];
  SANITATION = [];
  CARPENTARY = [];
  TRANSPORTATION = [];
  HOUSE_KEEPING = [];
  GARDENING = [];
  MISC = [];
  INFRASTRUCTURE = [];
  addFormStatus = false;
  table = false;
  alldata = [];
  total;
  verified_resolved_tot;
  resolution_in_progress_tot;
  pending_tot;
  user_deleted_tot;
  cannot_be_resolved_tot;
  assigned_tot;
  onhold_tot;
  user_resolved_tot;
  formsuccess = false;
  options: Object;
  overall: Object;
  bardetail: Object;
  avgtable=false;
  avgdata;
  // selecteddomain:any;
  selecteddomain1 ="all";
  selecteddomain = "all";
  // value1:any;
//img_url = "http://localhost/issue_register/uploads";
  img_url="http://210.16.79.137/issueregister/server/uploads";
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
  reg_no = localStorage.getItem('reg_no');
  name = localStorage.getItem('name');
  constructor(public api: ApiService, public fb: FormBuilder) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.issues_form = this.fb.group({
      seluserid: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      selstatus: ['', Validators.required]


    });



    this.taskeditForm = this.fb.group({
      priority: [''],
      status: [''],
      repaired_on: ['', [Validators.required]],
      repaired_by: ['', [Validators.required]],
      date_of_resolution: ['', [Validators.required]],
      notes: [],
      did: []
    });

    this.getDomainsbyId();
    this.getdetails();
  }
  by;
  Repaired_on1;
  date_of_resolution1;
  details(item) {
    console.log(item);
    this.value1 = this.value1;
    this.Repaired_on1 = item.repaired_on;
    this.date_of_resolution1 = item.date_of_resolution;
    if (item.repaired_on != null) {
      this.repaired_onn = item.repaired_on
    } else {
      this.repaired_onn = "YYYY-MM-DD"
    }

    if (item.date_of_resolution != null) {
      this.date_of_resolutionn = item.date_of_resolution
    } else {
      this.date_of_resolutionn = "YYYY-MM-DD"
    }
    this.by = item.raised_by;
    this.taskeditForm.patchValue({

      repaired_on: this.repaired_onn,
      date_of_resolution: this.date_of_resolutionn,

    });
    this.taskeditForm.patchValue(item);
    this.modal1.show();
  }
  close() {
    this.taskeditForm.reset();
    this.modal1.hide()
  }
  editTask() {
    let data = {};
    let s = this.taskeditForm.value.repaired_on._d;
    console.log(s.toString().substring(0, 24));

    console.log(this.taskeditForm.value.repaired_on._d);
    console.log(this.taskeditForm.value);

    data['did'] = this.taskeditForm.value.did;
    data['status'] = this.taskeditForm.value.status;
    data['priority'] = this.taskeditForm.value.priority;
    if (this.taskeditForm.value.repaired_on._d == 'Invalid Date') {
      data['repaired_on'] = this.Repaired_on1;
    } else {
      data['repaired_on'] = this.taskeditForm.value.repaired_on._d;
    }
    if (this.taskeditForm.value.date_of_resolution._d == 'Invalid Date') {
      data['date_of_resolution'] = this.date_of_resolution1;
    } else {
      data['date_of_resolution'] = this.taskeditForm.value.date_of_resolution._d;
    }
    //data['repaired_on'] = this.taskeditForm.value.repaired_on._d;
    data['repaired_by'] = this.taskeditForm.value.repaired_by;
    // data['date_of_resolution'] = this.taskeditForm.value.date_of_resolution._d;
    data['notes'] = this.taskeditForm.value.notes;
    console.log(data);

    this.api.UPDATEISSUE(data)
      .subscribe(
      data => {
        console.log(data);

        // this.taskeditForm.reset();
        this.modal1.hide();
        // this.getdetails();
        // this.ngOnInit();

      });
  }

  getdetails() {
    this.verified_resolved_tot = '0';
    this.resolution_in_progress_tot = '0';
    this.pending_tot = '0';
    this.user_deleted_tot = '0';
    this.cannot_be_resolved_tot = '0';
    this.assigned_tot = '0';
    this.onhold_tot = '0';
    this.user_resolved_tot = '0';
    this.total = '0';

    this.api.getdetails(this.reg_no).subscribe(alldata => {
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
            if (element.status == 'assigned') {
              this.assigned_tot = element.tot;
            }
            if (element.status == 'onhold') {
              this.onhold_tot = element.tot;
            }
            if (element.status == 'user_resolved') {
              this.user_resolved_tot = element.tot;
            }
            console.log(element.status, '-', element.tot);

          });
          this.options = {
            credits: {
              enabled: false
            },

            colors: ['#2980b9', '#e74c3c', "#f39c12", "#ed87a6", '#16a085', '#8bbc21', '#0d233a',
              '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            chart: {

              height: 370,
              width: 350,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#2C3E50 ',
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',

            },
            exporting: {


              enabled: false
            },
            title: false,
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                size: 160,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: false
                },
                showInLegend: true
              }
            },
            series: [{
              name: 'Total',
              colorByPoint: true,
              data: [{
                name: 'Pending',
                y: JSON.parse(this.pending_tot),
              },
              {
                name: 'User Deleted',
                y: JSON.parse(this.user_deleted_tot),
              },
              {
                name: 'Resolution in Progress',
                y: JSON.parse(this.resolution_in_progress_tot),
              },
              {
                name: 'Cannot be Resolved',
                y: JSON.parse(this.cannot_be_resolved_tot),
              },
              {
                name: 'Verified Resolved',
                y: JSON.parse(this.verified_resolved_tot),
              },
              {
                name: 'Assigned',
                y: JSON.parse(this.assigned_tot),
              },
              {
                name: 'On Hold',
                y: JSON.parse(this.onhold_tot),
              },
              {
                name: 'User Resolved',
                y: JSON.parse(this.user_resolved_tot),
              }
              ]
            }]
          };
        }

      }
    })
  }
  domainsbyid;
  getDomainsbyId() {
    this.api.getDomainsbyId(this.reg_no).subscribe(data => {
      if (data) {
        this.domainsbyid = data;
        console.log(this.domainsbyid);

      }
    })
  }
  selection = {};
  getSelIssueData() {
    this.total = '0';
    this.data = '';
    this.verified_resolved_tot = '0';
    this.resolution_in_progress_tot = '0';
    this.pending_tot = '0';
    this.user_deleted_tot = '0';
    this.cannot_be_resolved_tot = '0';
    this.assigned_tot = '0';
    this.onhold_tot = '0';
    this.user_resolved_tot = '0';
    this.selection['category'] = this.issues_form.value.seluserid;
    this.selection['status'] = this.issues_form.value.selstatus;
    this.selection['from_date'] = this.from_date;
    this.selection['to_date'] = this.to_date;
    this.selection['reg_no'] =this.reg_no;
    console.log(this.selection);
    
    this.api.GETISSUELISTS(this.selection).subscribe(data => {
    // this.api.getIssuesListBySelection(this.selection).subscribe(data => {
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
            if (element.status == 'assigned') {
              this.assigned_tot = element.tot;
            }
            if (element.status == 'onhold') {
              this.onhold_tot = element.tot;
            }
            if (element.status == 'user_resolved') {
              this.user_resolved_tot = element.tot;
            }
          });
          this.options = {
            credits: {
              enabled: false
            },

            colors: ['#2980b9', '#e74c3c', "#f39c12", "#ed87a6", '#16a085', '#8bbc21', '#0d233a',
              '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            chart: {

              height: 350,
              width: 350,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#2C3E50 ',
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',

            },
            exporting: {


              enabled: false
            },
            title: false,
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                size: 160,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: false
                },
                showInLegend: true
              }
            },
            series: [{
              name: 'Total',
              colorByPoint: true,
              data: [{
                name: 'Pending',
                y: JSON.parse(this.pending_tot),
              },
              {
                name: 'User Deleted',
                y: JSON.parse(this.user_deleted_tot),
              },
              {
                name: 'Resolution in Progress',
                y: JSON.parse(this.resolution_in_progress_tot),
              },
              {
                name: 'Cannot be Resolved',
                y: JSON.parse(this.cannot_be_resolved_tot),
              },
              {
                name: 'Verified Resolved',
                y: JSON.parse(this.verified_resolved_tot),
              },
              {
                name: 'Assigned',
                y: JSON.parse(this.assigned_tot),
              },
              {
                name: 'On Hold',
                y: JSON.parse(this.onhold_tot),
              },
              {
                name: 'User Resolved',
                y: JSON.parse(this.user_resolved_tot),
              }
              ]
            }]
          };
        }
        if(data.data2 =='NoAvgData'){        
          this.avgtable=false;
          
        }else{
            this.avgtable=true;
             this.avgdata = data.data2;
            console.log(this.avgdata);
            
        }

      }
    })

  }
  clear() {
    this.issues_form.reset();

  }

  showstatus = true;
  selectvalue;
  getDomain($event) {
    this.issues_form.patchValue({
      selstatus: 'all',
      from_date: '',
      to_date: ''
    })
    console.log($event.target.value);
    this.data = '';
    this.total = '0';
    this.verified_resolved_tot = '0';
    this.resolution_in_progress_tot = '0';
    this.pending_tot = '0';
    this.user_deleted_tot = '0';
    this.cannot_be_resolved_tot = '0';
    this.assigned_tot = '0';
    this.onhold_tot = '0';
    this.user_resolved_tot = '0';

    let value = {
      'domain': $event.target.value,
      'reg_no': this.reg_no
    }
    let  value1 = $event.target.value;
    this.selectvalue=$event.target.value;

    if (value1 == "all") {
      this.showstatus = false;
      this.getdetails();
    }
    else {
      this.showstatus = true;
      this.api.getDatabyId_Domain(value).subscribe(sellist => {
        if (sellist) {
          console.log(sellist);
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
              if (element.status == 'assigned') {
                this.assigned_tot = element.tot;
              }
              if (element.status == 'onhold') {
                this.onhold_tot = element.tot;
              }
              if (element.status == 'user_resolved') {
                this.user_resolved_tot = element.tot;
              }
            });
            this.options = {
              credits: {
                enabled: false
              },

              colors: ['#2980b9', '#e74c3c', "#f39c12", "#ed87a6", '#16a085', '#8bbc21', '#0d233a',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
              chart: {

                height: 350,
                width: 350,
                borderWidth: 1,
                borderRadius: 4,
                borderColor: '#2C3E50 ',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',

              },
              exporting: {


                enabled: false
              },
              title: false,
              tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              plotOptions: {
                pie: {
                  size: 160,
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: false
                  },
                  showInLegend: true
                }
              },
              series: [{
                name: 'Total',
                colorByPoint: true,
                data: [{
                  name: 'Pending',
                  y: JSON.parse(this.pending_tot),
                },
                {
                  name: 'User Deleted',
                  y: JSON.parse(this.user_deleted_tot),
                },
                {
                  name: 'Resolution in Progress',
                  y: JSON.parse(this.resolution_in_progress_tot),
                },
                {
                  name: 'Cannot be Resolved',
                  y: JSON.parse(this.cannot_be_resolved_tot),
                },
                {
                  name: 'Verified Resolved',
                  y: JSON.parse(this.verified_resolved_tot),
                },
                {
                name: 'Assigned',
                y: JSON.parse(this.assigned_tot),
              },
              {
                name: 'On Hold',
                y: JSON.parse(this.onhold_tot),
              },
              {
                name: 'User Resolved',
                y: JSON.parse(this.user_resolved_tot),
              }
                ]
              }]
            };
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
  getStatus($event) {
   console.log($event.target.value);
    this.data = '';
    this.total = '0';
    this.verified_resolved_tot = '0';
    this.resolution_in_progress_tot = '0';
    this.pending_tot = '0';
    this.user_deleted_tot = '0';
    this.cannot_be_resolved_tot = '0';
    this.assigned_tot = '0';
    this.onhold_tot = '0';
    this.user_resolved_tot = '0';

    let value = {
      'status': $event.target.value,
      'reg_no': this.reg_no,
      'category': this.selectvalue
    }
  let  value1 = $event.target.value;
  // this.selectvalue=$event.target.value;

    
      // this.showstatus = true;
      this.api.getDatabyId_Status(value).subscribe(sellist1 => {
        if (sellist1) {
          console.log(sellist1);
          this.data = sellist1.data;
          this.data2 = sellist1.data1;
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
              if (element.status == 'assigned') {
                this.assigned_tot = element.tot;
              }
              if (element.status == 'onhold') {
                this.onhold_tot = element.tot;
              }
              if (element.status == 'user_resolved') {
                this.user_resolved_tot = element.tot;
              }
            });
            this.options = {
              credits: {
                enabled: false
              },

              colors: ['#2980b9', '#e74c3c', "#f39c12", "#ed87a6", '#16a085', '#8bbc21', '#0d233a',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
              chart: {

                height: 350,
                width: 350,
                borderWidth: 1,
                borderRadius: 4,
                borderColor: '#2C3E50 ',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',

              },
              exporting: {


                enabled: false
              },
              title: false,
              tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              plotOptions: {
                pie: {
                  size: 160,
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: false
                  },
                  showInLegend: true
                }
              },
              series: [{
                name: 'Total',
                colorByPoint: true,
                data: [{
                  name: 'Pending',
                  y: JSON.parse(this.pending_tot),
                },
                {
                  name: 'User Deleted',
                  y: JSON.parse(this.user_deleted_tot),
                },
                {
                  name: 'Resolution in Progress',
                  y: JSON.parse(this.resolution_in_progress_tot),
                },
                {
                  name: 'Cannot be Resolved',
                  y: JSON.parse(this.cannot_be_resolved_tot),
                },
                {
                  name: 'Verified Resolved',
                  y: JSON.parse(this.verified_resolved_tot),
                },
                {
                name: 'Assigned',
                y: JSON.parse(this.assigned_tot),
              },
              {
                name: 'On Hold',
                y: JSON.parse(this.onhold_tot),
              },
              {
                name: 'User Resolved',
                y: JSON.parse(this.user_resolved_tot),
              }
                ]
              }]
            };
          }
        } else {
          this.data = '';
        }

      });

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

  img_data;
  getImagesbyId(img_id, reg_no) {
    console.log(img_id, reg_no);

    this.api.getImagesbyId(img_id, reg_no).subscribe(data => {
      console.log(data);
      this.img_data = data;
      this.modal3.show();
    })
  }
  imageclose() {
    this.modal3.hide();
  }

}
