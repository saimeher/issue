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
  @ViewChild('modal3') modal3: ModalComponent;
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
  data3;
  avgtable = false;
  avgdata;
  options: Object;
  overall: Object;
  bardetail: Object;
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
  domainname;
  domain1;
  description;
  cannottext;
  priority1;
  resstart;
  assignedon;
  assigned_to;
  registration_no;
  fullname;
  dat1;



  today = new Date();
  // selecteddomain:any;
  selecteddomain1 = "all";
  selecteddomain = "all";
  // selectchart='pie';
  // selstatus ="all";
  //data:any;
  role = localStorage.getItem('role');
  //img_url = "http://localhost/issue_register/uploads";
  img_url = "http://210.16.79.137/raghuerp/issueregister/server/uploads";
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
      selstatus: ['', Validators.required],
      // selectchart:['',Validators.required]

    });
    console.log('date', this.from_date)
    // this.getIssuesList();
    console.log(this.role);
    if (this.role == 'adm') {
      this.getAllIssues();
    }
    this.getCategories();
    // this.selStatus();
  }
  total;
  verified_resolved_tot;
  resolution_in_progress_tot;
  pending_tot;
  user_deleted_tot;
  cannot_be_resolved_tot;
  assigned_tot;
  onhold_tot;
  closed_tot;

  getAllIssues() {
    this.verified_resolved_tot = '0';
    this.resolution_in_progress_tot = '0';
    this.pending_tot = '0';
    this.user_deleted_tot = '0';
    this.cannot_be_resolved_tot = '0';
    this.assigned_tot = '0';
    this.onhold_tot = '0';
    this.closed_tot = '0';
    // this.user_resolved_tot = '0';
    this.total = '0';
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
              type: 'pie'

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
                name: 'Verified & Resolved',
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
        if (alldata.data2 == 'NoAvgData') {
          this.avgtable = false;

        }
        else {
          this.avgtable = true;
          this.avgdata = alldata.data2;
          console.log(this.avgdata);

        }
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
    this.modal1.show();
  }
  showstatus = true;
  selectvalue;
  categoryvalue;
  selCategory($event) {
    this.issues_form.patchValue({
      selstatus: 'all',
      from_date: '',
      to_date: ''
    })
    // if(status != "null")
    this.summarydata = false;
    this.data = '';
    this.total = '0';
    this.verified_resolved_tot = '0';
    this.resolution_in_progress_tot = '0';
    this.pending_tot = '0';
    //  this.pending_tot = 0;
    this.user_deleted_tot = '0';
    this.cannot_be_resolved_tot = '0';
    this.assigned_tot = '0';
    this.onhold_tot = '0';
    // this.user_resolved_tot = '0';
    this.closed_tot = '0';
    console.log('his', $event.target.value);
    let value = $event.target.value;
    this.selectvalue = $event.target.value;
    this.categoryvalue = $event.target.value;
    if (value == 'all') {
      // console.log('jsod');
      this.showstatus = false;
      this.getAllIssues();

    } else {
      this.showstatus = true;
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
                  size: 180,
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
          // this.data2.forEach(element => {

          //    this.total=element.t;
          //  });

        }
        // else {
        //   this.data = '';
        // }
        if (sellist.data2 == 'NoAvgData') {
          this.avgtable = false;

        }
        else {
          this.avgtable = true;
          this.avgdata = sellist.data2;
          console.log(this.avgdata);

        }

      });
    }
  }
  from_date;
  to_date;
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
    console.log(this.selection);
    this.api.getIssuesListBySelection(this.selection).subscribe(data => {
      if (data) {
        this.data = data.data;
        this.data2 = data.data1;
        if (this.data2 == 'NoData') {
          this.table = true;
        }
        else {
          this.table = false;
          console.log(this.data2);
          this.data2.forEach(element => {
            this.total = element.t;
            this.domainname = this.selecteddomain;
            // this.gardening=  'gardening';

            if (this.issues_form.value.selstatus != 'all' && this.domainname == 'all') {

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
            } else {
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
              // if (element.status == 'user_resolved') {
              //   this.user_resolved_tot = element.tot;
              // }
              if (element.status == 'closed') {
                this.closed_tot = element.tot;
              }
            }
          });

          if (this.issues_form.value.selstatus != 'all' && this.domainname == 'all') {
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

          } else {
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
                  name: 'user_deleted_tot',
                  y: JSON.parse(this.user_deleted_tot),
                },
                {
                  name: 'resolution_in_progress_tot',
                  y: JSON.parse(this.resolution_in_progress_tot),
                },
                {
                  name: 'cannot_be_resolved_tot',
                  y: JSON.parse(this.cannot_be_resolved_tot),
                },
                {
                  name: 'verified_resolved_tot',
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
                // {
                //   name: 'User Resolved',
                //   y: JSON.parse(this.user_resolved_tot),
                // }
                {
                  name: 'Closed',
                  y: JSON.parse(this.closed_tot),
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

  selStatus($event, checked) {
    if (checked == 'checked') {
      if (this.r == 1) {
        this.selectvalue = "all";
      }

      ++this.r;
    }
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
    this.closed_tot = '0';
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
    console.log('his', $event.target.value);
    this.selectvalue;
    console.log(this.selectvalue);
    let value1 = $event.target.value;
    console.log(value1);
    let value = {
      'status': $event.target.value,
      'category': this.selecteddomain,
    }
    console.log(value);

    //  this.showstatus = true;
    this.api.getIssuesListbyStatus(value).subscribe(sellist1 => {
      if (sellist1) {
        console.log(sellist1.data);
        this.data = sellist1.data;
        this.data2 = sellist1.data1;
        if (this.data2 == 'NoData') {
          this.table = true;
        }
        else {
          this.table = false;
          console.log(this.data2);

          this.data2.forEach(element => {
            this.total = element.t;
            console.log('hjhj', element.tot)
            console.log('hio', element.status);
            this.domainname = this.selecteddomain;
            // this.gardening=  'gardening';

            if ($event.target.value != 'all' && this.domainname == 'all') {

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
              // if (element.status == 'user_resolved') {
              //   this.user_resolved_tot = element.tot;
              // }
              if (element.status == 'closed') {
                this.closed_tot = element.tot;
              }

            }

          });

          if ($event.target.value != 'all' && this.domainname == 'all') {
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
      }
      if (sellist1.data2 == 'NoAvgData') {
        this.avgtable = false;

      }
      else {
        this.avgtable = true;
        this.avgdata = sellist1.data2;
        console.log(this.avgdata);

      }

    });


  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    editableDateField: false,
    disableWeekends: false,

  };
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

  // onDateChanged(event: IMyDateModel) {

  //   this.from_date = event.formatted;
  //   this.myDatePickerOptions2.disableUntil.year = event.date.year
  //   this.myDatePickerOptions2.disableUntil.month = event.date.month
  //   this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
  // }
  onDateChanged(event: IMyDateModel) {

    // this.from_date = event.formatted;
    this.from_date = event.date.year + '-' + event.date.month + '-' + event.date.day;
    this.myDatePickerOptions2.disableUntil.year = event.date.year
    this.myDatePickerOptions2.disableUntil.month = event.date.month
    this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
  }

  onDateChanged2(event: IMyDateModel) {
   
    // this.to_date = event.formatted
    this.to_date = event.date.year + '-' + event.date.month + '-' + event.date.day;
    console.log(this.to_date, 'from date test');
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
