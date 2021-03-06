import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { DateComponent } from '../date/date.component';
import { ModalComponent } from '../modal.component';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-myissues-list',
  templateUrl: './myissues-list.component.html',
  styleUrls: ['./myissues-list.component.css']
})
export class MyissuesListComponent implements OnInit {
  @ViewChild('modal1') modal1: ModalComponent;
  @ViewChild('modal3') modal3: ModalComponent;
  @ViewChild('modal2') modal2: ModalComponent;
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    timeout: 5000
  });

  public toasterService: ToasterService;
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
  // user_resolved_tot;
  formsuccess = false;
  options: Object;
  overall: Object;
  bardetail: Object;
  avgtable = false;
  avgdata;
  issuedescription;
  dropdownSettings = {};
  showusers=[];

  r = 1;
  ac;
  ac_total;
  carpentary;
  carpentary_total;
  electrical;
  electrical_total;
  civil;
  civil_total;
  misc;
  misc_total;
  infrastructure;
  infrastructure_total;
  transportation;
  transportation_total;
  gardening;
  gardening_total;
  sanitation;
  sanitation_total;
  water_supply;
  water_supply_total;
  house_keeping;
  house_keeping_total;
  summarydata = false;
  dropdownList = [];
  repaired_by;
assigned_on;
date_of_resolution;
did;
today = new Date();
closed_tot;

date;
raised_by;
problem;
location;
issue;
on;
resolution;
notes;
domain1;
description;
priority1;
by;
Repaired_on1;
date_of_resolution1;
showdays;
assignedon;
resstart;
name1 ='';
assigned_to;
cannottext;
dat1;
registration_no='';
fullname='';
expected_resolution_date = '';
status1='';

  // selecteddomain:any;
  selecteddomain1 = "all";
  selecteddomain = "all";
  // value1:any;
  //img_url = "http://localhost/issue_register/uploads";
  img_url = "http://210.16.79.137/raghuerp/issueregister/server/uploads";
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
  reg_no = localStorage.getItem('reg_no');
  name = localStorage.getItem('name');
  constructor(public api: ApiService, public fb: FormBuilder,toasterService: ToasterService) {  
    this.toasterService = toasterService ;
    const vals = {
      utype: 'adm',

    }
    this.api.getStaffData(vals).subscribe(dataa => {
      // console.log(dataa);
      for (var i = 0; i < dataa.data.data.length; i++) {
        if (localStorage.getItem('reg_no') != dataa.data.data[i].reg_no) {
          this.dropdownList[i] = new Object();
          this.dropdownList[i]["id"] = dataa.data.data[i].reg_no;
          this.dropdownList[i]["itemName"] = dataa.data.data[i].reg_no + ' - ' + dataa.data.data[i].name;
        }
      }
    });
  }

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
      assigned_on:[''],
      onholdtext:[''],
      assignedtext:[''],
      cannottext:[''],
      repaired_on: [''],
      repaired_by: [],
      expected_resolution_date:[''],
      
      resolutiontext:[''],
      date_of_resolution: new FormControl(),
      notes: [],
      did: []
    });

    this.getDomainsbyId();
    this.getdetails();
    // this.getname();
    this.dropdownSettings = {

      singleSelection: true,
      text: "Select ",
      enableSearchFilter: true,
      classes: "myclass custom-class",
    };

  }

  details(item) {
    console.log(item,'3sdfhjksd');
    this.did = item.did;
   
    this.by = item.raised_by;
    this.status1=item.status;
    this.issuedescription = item.issue_desc;
    this.taskeditForm.patchValue(item);
     this.showusers=[];
    this.showusers[0]=new Object();
    console.log(item.repaired_by);
    // console.log(item.repaired_by.substr(0,8))
    // console.log(item.repaired_by.split("-")[0]);
    this.showusers[0]['id'] = item.repaired_by;
    this.showusers[0]['itemName'] = item.repaired_by;
    this.id = item.repaired_by;
    // this.name1 = item.repaired_by;
    this.taskeditForm.patchValue({ date_of_resolution: { formatted: item.date_of_resolution } });
    this.taskeditForm.patchValue({ assigned_on: { formatted: item.assigned_on } });
    this.taskeditForm.patchValue({ expected_resolution_date:  { jsdate: new Date(item.expected_resolution_date)} });
    this.date_of_resolution = item.date_of_resolution;
    this.expected_resolution_date = item.expected_resolution_date;
    console.log(this.expected_resolution_date);
    this.assigned_on= item.assigned_on;
    // this.repaired_by = item.repaired_by;
    // console.log(this.repaired_by);
    console.log('date',this.expected_resolution_date);
    this.showdays = item.status;
    
    this.modal1.show();

  }
  onItemSelect(item: any) {
    console.log(item);
    this.id = item.id;
    this.name1 = item.itemName;
  }
  OnItemDeSelect(item: any) {
    console.log(item);
  }

  close() {
    this.taskeditForm.reset();
    this.modal1.hide()
  }

  editTask() {
    console.log(this.name1);
    let edit={}
    edit['priority'] =  this.taskeditForm.value.priority;
    edit['status']= this.taskeditForm.value.status;
    edit['assigned_on']= this.assigned_on;
    edit['assigned_to']= this.id;
    // edit['assigned_to'] = this.name1;
    edit['assignedtext']= this.taskeditForm.value.assignedtext;
    edit['onholdtext']= this.taskeditForm.value.onholdtext;
    edit['date_of_resolution']= this.date_of_resolution;
    edit['notes'] = this.taskeditForm.value.notes;
    edit['cannottext'] = this.taskeditForm.value.cannottext;
    edit['resolutiontext'] = this.taskeditForm.value.resolutiontext;
    edit['expected_resolution_date'] =this.expected_resolution_date;
    edit['did'] = this.did;
    console.log(edit);

    this.api.UPDATEISSUE(edit)
      .subscribe(
      data => {
        console.log(data);
        if(data.success){
          this.id = null
          // this.name1 =null
          this.popToast1();
          // this.taskeditForm.reset();
          this.getdetails();
         
          this.issues_form.patchValue({
            seluserid: 'all',
            selstatus: 'all',
            from_date: '',
            to_date: ''
          })
          this.modal1.hide();
        }
         
          else{
            this.popToast();
          }
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
    // this.user_resolved_tot = '0';
    this.closed_tot='0';
    this.total = '0';
    this.summarydata = false;
    this.api.getdetails(this.reg_no).subscribe(alldata => {
      if (alldata) {
        // console.log(alldata.data);
        // console.log(alldata.data1);
        this.data2 = alldata.data1;
        this.data = alldata.data;
        if (this.data2 == 'NoData') {
          this.table = true;
        } else {
          this.table = false;
          // console.log(this.data2);
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
            // if (element.status == 'user_resolved') {
            //   this.user_resolved_tot = element.tot;
            // }
            if (element.status == 'closed') {
              this.closed_tot = element.tot;
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

              height: 320,
              width: 400,
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
              pointFormat: '{series.name}: <b>{point.y}  ({point.percentage:.1f}%)</b>'
            },
            plotOptions: {
              pie: {
                size: 160,
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true
                },
                showInLegend: false
              }
            },
            series: [{
              name: 'Total',
              colorByPoint: true,
              data: [
                {
                  name: 'Pending',
                  y: JSON.parse(this.pending_tot),
                },
                {
                  name: 'Assigned',
                  y: JSON.parse(this.assigned_tot),
                },
                {
                  name: 'Resolution in Progress',
                  y: JSON.parse(this.resolution_in_progress_tot),
                },
                {
                  name: 'Verified Resolved',
                  y: JSON.parse(this.verified_resolved_tot),
                },
                // {
                //   name: 'User Resolved',
                //   y: JSON.parse(this.user_resolved_tot),
                // },
                {
                  name: 'closed',
                  y: JSON.parse(this.closed_tot),
                },
                {
                  name: 'User Deleted',
                  y: JSON.parse(this.user_deleted_tot),
                },
                {
                  name: 'On Hold',
                  y: JSON.parse(this.onhold_tot),
                },
                {
                  name: 'Cannot be Resolved',
                  y: JSON.parse(this.cannot_be_resolved_tot),
                }
              ]
            }]
          };
        }

      }
      if (alldata.data2 == 'NoAvgData') {
        this.avgtable = false;

      } else {
        this.avgtable = true;
        this.avgdata = alldata.data2;
        console.log(this.avgdata);

      }
    })
  }
  domainsbyid;
  getDomainsbyId() {
    this.api.getDomainsbyId(this.reg_no).subscribe(data => {
      if (data) {
        this.domainsbyid = data;
        // console.log(this.domainsbyid);
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
    //  this.pending_tot = 0;
    this.user_deleted_tot = '0';
    this.cannot_be_resolved_tot = '0';
    this.assigned_tot = '0';
    this.onhold_tot = '0';
    // this.user_resolved_tot = '0';
    this.assigned_tot = '0';
    this.onhold_tot = '0';
    // this.user_resolved_tot = '0';
    this.gardening_total = '0';
    this.ac_total = '0';
    this.carpentary_total = '0';
    this.electrical_total = '0';
    this.civil_total = '0';
    this.misc_total = '0';
    this.transportation_total = '0';
    this.sanitation_total = '0';
    this.infrastructure_total = '0';
    this.water_supply_total = '0';
    this.house_keeping_total = '0';
    this.closed_tot = '0';
    this.selection['category'] = this.issues_form.value.seluserid;
    this.selection['status'] = this.issues_form.value.selstatus;
    this.selection['from_date'] = this.from_date;
    this.selection['to_date'] = this.to_date;
    this.selection['reg_no'] = this.reg_no;
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
            if (this.issues_form.value.selstatus != 'all' && this.selecteddomain == 'all') {

              this.summarydata = true;

              if (element.status == 'ac') {
                this.ac_total = element.tot;
              }
              if (element.status == 'carpentary') {
                //  this.carpentary=  element.status;
                this.carpentary_total = element.tot;
              }
              if (element.status == 'electrical') {
                // this.electrical=  element.status;
                this.electrical_total = element.tot;
              }
              if (element.status == 'civil') {
                //this.civil=  element.status;
                this.civil_total = element.tot;
              }
              if (element.status == 'misc') {
                // this.misc=  element.status;
                this.misc_total = element.tot;
              }
              if (element.status == 'transportation') {
                // this.transportation=  element.status;
                this.transportation_total = element.tot;
              }
              if (element.status == 'gardening') {
                // this.gardening=  element.status;
                this.gardening_total = element.tot;
              }
              if (element.status == 'infrastructure') {
                // this.infrastructure=  element.status;
                this.infrastructure_total = element.tot;
              }
              if (element.status == 'sanitation') {
                // this.sanitation=  element.status;
                this.sanitation_total = element.tot;
              }
              if (element.status == 'water_supply') {
                // this.water_supply=  element.status;
                this.water_supply_total = element.tot;
              }
              if (element.status == 'house_keeping') {
                // this.house_keeping=  element.status;
                this.house_keeping_total = element.tot;
              }


            }
            else {
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
              // if (element.status == 'user_resolved') {
              //   this.user_resolved_tot = element.tot;
              // }
              if (element.status == 'closed') {
                this.closed_tot = element.tot;
              }
            }
          });

          if (this.issues_form.value.selstatus != 'all' && this.selecteddomain == 'all') {
            this.options = {
              credits: {
                enabled: false
              },

              colors: ['#2980b9', '#e74c3c', "#f39c12", "#ed87a6", '#16a085', '#8bbc21', '#0d233a',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
              chart: {

                height: 320,
                width: 400,
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
                pointFormat: '{series.name}: <b>{point.y}  ({point.percentage:.1f}%)</b>'
              },
              plotOptions: {
                pie: {
                  size: 180,
                  allowPointSelect: false,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true
                  },
                  showInLegend: false
                }
              },
              series: [{
                name: 'Total',
                colorByPoint: true,
                data: [{
                  name: 'Ac',
                  y: JSON.parse(this.ac_total),
                },
                {
                  name: 'Carpentary',
                  y: JSON.parse(this.carpentary_total),
                },
                {
                  name: 'Electrical',
                  y: JSON.parse(this.electrical_total),
                },
                {
                  name: 'Civil',
                  y: JSON.parse(this.civil_total),
                },
                {
                  name: 'Miscellaneous',
                  y: JSON.parse(this.misc_total),
                },
                {
                  name: 'Infrastructure',
                  y: JSON.parse(this.infrastructure_total),
                },
                {
                  name: 'Transportation',
                  y: JSON.parse(this.transportation_total),
                },
                {
                  name: 'Gardening',
                  y: JSON.parse(this.gardening_total),
                },
                {
                  name: 'Sanitation',
                  y: JSON.parse(this.sanitation_total),
                },
                {
                  name: 'Water Supply',
                  y: JSON.parse(this.water_supply_total),
                },
                {
                  name: 'House Keeping',
                  y: JSON.parse(this.house_keeping_total),
                }
                ]
              }]

            };

          }
          else {
            this.options = {
              credits: {
                enabled: false
              },

              colors: ['#2980b9', '#e74c3c', "#f39c12", "#ed87a6", '#16a085', '#8bbc21', '#0d233a',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
              chart: {

                height: 320,
                width: 400,
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
                pointFormat: '{series.name}: <b>{point.y}  ({point.percentage:.1f}%)</b>'
              },
              plotOptions: {
                pie: {
                  size: 160,
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true
                  },
                  showInLegend: false
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
                  name: 'Assigned',
                  y: JSON.parse(this.assigned_tot),
                },
                {
                  name: 'Resolution in Progress',
                  y: JSON.parse(this.resolution_in_progress_tot),
                },
                {
                  name: 'Verified Resolved',
                  y: JSON.parse(this.verified_resolved_tot),
                },
                // {
                //   name: 'User Resolved',
                //   y: JSON.parse(this.user_resolved_tot),
                // },
                {
                  name: 'Closed',
                  y: JSON.parse(this.closed_tot),
                },
                {
                  name: 'User Deleted',
                  y: JSON.parse(this.user_deleted_tot),
                },
                {
                  name: 'On Hold',
                  y: JSON.parse(this.onhold_tot),
                },
                {
                  name: 'Cannot be Resolved',
                  y: JSON.parse(this.cannot_be_resolved_tot),
                }
                ]
              }]
            };
          }
        }
        if (data.data2 == 'NoAvgData') {
          this.avgtable = false;

        } else {
          this.avgtable = true;
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
    this.summarydata = false;
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
    // this.user_resolved_tot = '0';
    this.closed_tot = '0';

    let value = {
      'domain': $event.target.value,
      'reg_no': this.reg_no
    }
    let value1 = $event.target.value;

    this.selectvalue = $event.target.value;

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
              // if (element.status == 'user_resolved') {
              //   this.user_resolved_tot = element.tot;
              // }
              if (element.status == 'closed') {
                this.closed_tot = element.tot;
              }
              
            });
            this.options = {
              credits: {
                enabled: false
              },

              colors: ['#2980b9', '#e74c3c', "#f39c12", "#ed87a6", '#16a085', '#8bbc21', '#0d233a',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
              chart: {

                height: 320,
                width: 400,
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
                pointFormat: '{series.name}: <b>{point.y}  ({point.percentage:.1f}%)</b>'
              },
              plotOptions: {
                pie: {
                  size: 160,
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true
                  },
                  showInLegend: false,



                },


              },
              series: [{
                name: 'Total',
                events: {
                  legendItemClick: function () {

                    return false;
                  }
                },
                colorByPoint: true,
                data: [{
                  name: 'Pending',
                  y: JSON.parse(this.pending_tot),
                },
                {
                  name: 'Assigned',
                  y: JSON.parse(this.assigned_tot),
                },
                {
                  name: 'Resolution in Progress',
                  y: JSON.parse(this.resolution_in_progress_tot),
                },
                {
                  name: 'Verified Resolved',
                  y: JSON.parse(this.verified_resolved_tot),
                },
                // {
                //   name: 'User Resolved',
                //   y: JSON.parse(this.user_resolved_tot),
                // },
                {
                  name: 'Closed',
                  y: JSON.parse(this.closed_tot),
                },
                {
                  name: 'User Deleted',
                  y: JSON.parse(this.user_deleted_tot),
                },
                {
                  name: 'On Hold',
                  y: JSON.parse(this.onhold_tot),
                },
                {
                  name: 'Cannot be Resolved',
                  y: JSON.parse(this.cannot_be_resolved_tot),
                }
                ]
              }]
            };
          }
          // this.data2.forEach(element => {

          //    this.total=element.t;
          //  });

        }
        // else {
        //   this.data = '';
        // }
        if (sellist.data2 == 'NoAvgData') {
          this.avgtable = false;

        } else {
          this.avgtable = true;
          this.avgdata = sellist.data2;
          console.log(this.avgdata);

        }

      });
    }

  }
  getStatus($event, checked) {

    // if (checked == 'checked') {
    //   if (this.r == 1) {
    //     this.selectvalue = "all";
    //   }

    //   ++this.r;
    // }

    // console.log($event.target.value);
    this.data = '';
    this.total = '0';
    this.verified_resolved_tot = '0';
    this.resolution_in_progress_tot = '0';
    this.pending_tot = '0';
    // this.pending_tot = 0;
    this.user_deleted_tot = '0';
    this.cannot_be_resolved_tot = '0';
    this.assigned_tot = '0';
    this.onhold_tot = '0';
    // this.user_resolved_tot = '0';
    this.gardening_total = '0';
    this.ac_total = '0';
    this.carpentary_total = '0';
    this.electrical_total = '0';
    this.civil_total = '0';
    this.misc_total = '0';
    this.transportation_total = '0';
    this.sanitation_total = '0';
    this.infrastructure_total = '0';
    this.water_supply_total = '0';
    this.house_keeping_total = '0';
    this.closed_tot = '0';


    let value = {
      'status': $event.target.value,
      'reg_no': this.reg_no,
      'category': this.selecteddomain
    }
    let value1 = $event.target.value;
    // this.selectvalue=$event.target.value;


    // this.showstatus = true;
    this.api.getDatabyId_Status(value).subscribe(sellist1 => {
      console.log(sellist1.data)
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
            if ($event.target.value != 'all' && this.selecteddomain == 'all') {
              this.summarydata = true;
              if (element.status == 'ac') {
                this.ac_total = element.tot;
              }
              if (element.status == 'carpentary') {
                //  this.carpentary=  element.status;
                this.carpentary_total = element.tot;
              }
              if (element.status == 'electrical') {
                // this.electrical=  element.status;
                this.electrical_total = element.tot;
              }
              if (element.status == 'civil') {
                //this.civil=  element.status;
                this.civil_total = element.tot;
              }
              if (element.status == 'misc') {
                // this.misc=  element.status;
                this.misc_total = element.tot;
              }
              if (element.status == 'transportation') {
                // this.transportation=  element.status;
                this.transportation_total = element.tot;
              }
              if (element.status == 'gardening') {
                // this.gardening=  element.status;
                this.gardening_total = element.tot;
              }
              if (element.status == 'infrastructure') {
                // this.infrastructure=  element.status;
                this.infrastructure_total = element.tot;
              }
              if (element.status == 'sanitation') {
                // this.sanitation=  element.status;
                this.sanitation_total = element.tot;
              }
              if (element.status == 'water_supply') {
                // this.water_supply=  element.status;
                this.water_supply_total = element.tot;
              }
              if (element.status == 'house_keeping') {
                // this.house_keeping=  element.status;
                this.house_keeping_total = element.tot;
              }
            }
            else {
              this.summarydata = false;

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
              if (element.status == 'closed') {
                this.closed_tot = element.tot;
              }
            }
          });

          if ($event.target.value != 'all' && this.selecteddomain == 'all') {
            this.options = {
              credits: {
                enabled: false
              },

              colors: ['#2980b9', '#e74c3c', "#f39c12", "#ed87a6", '#16a085', '#8bbc21', '#0d233a',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
              chart: {

                height: 320,
                width: 400,
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
                pointFormat: '{series.name}: <b>{point.y}  ({point.percentage:.1f}%)</b>'
              },
              plotOptions: {
                pie: {
                  size: 180,
                  allowPointSelect: false,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true
                  },
                  showInLegend: false
                }
              },
              series: [{
                name: 'Total',
                colorByPoint: true,
                data: [{
                  name: 'Ac',
                  y: JSON.parse(this.ac_total),
                },
                {
                  name: 'Carpentary',
                  y: JSON.parse(this.carpentary_total),
                },
                {
                  name: 'Electrical',
                  y: JSON.parse(this.electrical_total),
                },
                {
                  name: 'Civil',
                  y: JSON.parse(this.civil_total),
                },
                {
                  name: 'Miscellaneous',
                  y: JSON.parse(this.misc_total),
                },
                {
                  name: 'Infrastructure',
                  y: JSON.parse(this.infrastructure_total),
                },
                {
                  name: 'Transportation',
                  y: JSON.parse(this.transportation_total),
                },
                {
                  name: 'Gardening',
                  y: JSON.parse(this.gardening_total),
                },
                {
                  name: 'Sanitation',
                  y: JSON.parse(this.sanitation_total),
                },
                {
                  name: 'Water Supply',
                  y: JSON.parse(this.water_supply_total),
                },
                {
                  name: 'House Keeping',
                  y: JSON.parse(this.house_keeping_total),
                }
                ]
              }]

            };


          }
          else {
            this.options = {
              credits: {
                enabled: false
              },

              colors: ['#2980b9', '#e74c3c', "#f39c12", "#ed87a6", '#16a085', '#8bbc21', '#0d233a',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
              chart: {

                height: 320,
                width: 400,
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
                pointFormat: '{series.name}: <b>{point.y}  ({point.percentage:.1f}%)</b>'
              },
              plotOptions: {
                pie: {
                  size: 160,
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true
                  },
                  showInLegend: false
                },

              },
              series: [{
                name: 'Total',
                colorByPoint: true,
                data: [{
                  name: 'Pending',
                  y: JSON.parse(this.pending_tot),
                },
                {
                  name: 'Assigned',
                  y: JSON.parse(this.assigned_tot),
                },
                {
                  name: 'Resolution in Progress',
                  y: JSON.parse(this.resolution_in_progress_tot),
                },
                {
                  name: 'Verified Resolved',
                  y: JSON.parse(this.verified_resolved_tot),
                },
                {
                  name: 'Closed',
                  y: JSON.parse(this.closed_tot),
                },
                {
                  name: 'User Deleted',
                  y: JSON.parse(this.user_deleted_tot),
                },
                {
                  name: 'On Hold',
                  y: JSON.parse(this.onhold_tot),
                },
                {
                  name: 'Cannot be Resolved',
                  y: JSON.parse(this.cannot_be_resolved_tot),
                }
                ]
              }]

            };
          }
        }
      } if (sellist1.data2 == 'NoAvgData') {
        this.avgtable = false;

      } else {
        this.avgtable = true;
        this.avgdata = sellist1.data2;
        // console.log(this.avgdata);

      }

    });

  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    editableDateField: false,
    disableWeekends: false,
    // disableDays: this.service.holidays,
      // disableUntil: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() - 1 }
    // disableUntil: {year: , month: 5 , day: 17}

  };

  // public myDatePickerOptions3: IMyDpOptions = {
  //   // other options...
  //   dateFormat: 'yyyy-mm-dd',
  //   editableDateField: false,
  //   disableWeekends: false,
  //   // disableDays: this.service.holidays,
  //  disableUntil: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() - 1 }
  //   // disableUntil: {year: , month: 5 , day: 17}

  // };



  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
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

    // this.from_date = event.formatted;
    this.from_date = event.date.year + '-' + event.date.month + '-' + event.date.day;
    this.myDatePickerOptions2.disableUntil.year = event.date.year
    this.myDatePickerOptions2.disableUntil.month = event.date.month
    this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
  }

  onDateChanged2(event: IMyDateModel) {
    console.log(this.to_date, 'from date test');
    // this.to_date = event.formatted
    this.to_date = event.date.year + '-' + event.date.month + '-' + event.date.day;
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

  selStataus($event) {
    console.log('status', $event.target.value);
    this.showdays = $event.target.value;
  }
  
  onDateChanged1(event: IMyDateModel) {

    this.assigned_on = event.formatted;
    this.myDatePickerOptions2.disableUntil.year = event.date.year
    this.myDatePickerOptions2.disableUntil.month = event.date.month
    this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
  }
  onDateChanged3(event: IMyDateModel) {
    // console.log(this.to_date, 'from date test');
    this.date_of_resolution = event.formatted;
  }

  resolveddetails(item)
   {
    this.registration_no = item.reg_no;
      let nams={};
      nams['reg_no'] = this.registration_no;
      nams['utype'] = 'stf';
      this.api.getname(nams).subscribe(dat1=>{
        this.dat1=dat1;
        console.log(this.dat1);
        this.fullname =dat1.data.certificates.firstname;
        
      })
      this.date = item.insert_dt;  
      this.raised_by = item.raised_by;
      this.problem = item.problem;
      this.location = item.location;
      this.issue = item.issue_desc;
      this.id = item.did;
      this.on = item.repaired_on;
      this.resolution = item.date_of_resolution;
      this.notes = item.notes;
      this.domain1=item.domain;
      this.description = item.issue_desc;
      this.priority1 = item.priority;
      this.resstart = item.resolutionstarted;
      this.assignedon = item.assigned_on;
      this.assigned_to  = item.repaired_by;
      this.cannottext = item.cannottext;
      this.modal2.show();
  }
  popToast1() {
    this.toasterService.pop('success', '', 'Updated Successfully');
  }
  popToast() {
    this.toasterService.pop('warning', '', 'Please select Assigned to ');
  }
  onDateChanged4(event: IMyDateModel) {
    // this.expected_resolution_date = event.formatted;
    this.expected_resolution_date = event.date.year + '-' + event.date.month + '-' + event.date.day;
    console.log(event);
    console.log(this.expected_resolution_date, 'from date test');
  }
  // getname()
  //   {
  //     let nams={};
  //     nams['reg_no'] = this.registration_no;
  //     nams['utype'] = 'stf';
  //     this.api.getname(nams).subscribe(dat1=>{
  //       this.dat1=dat1;
  //       console.log(this.dat1);
  //     })
  //   }
  public myDatePickerOptions4: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    editableDateField: false,
    disableWeekends: false,
    // disableDays: this.service.holidays,
    disableUntil: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() - 1 }
    // disableUntil: {year: , month: 5 , day: 17}

  };
}
