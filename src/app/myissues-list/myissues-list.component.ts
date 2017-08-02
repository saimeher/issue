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
  issues_form:FormGroup;
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
  alldata=[];
  total;
  verified_resolved_tot;
  resolution_in_progress_tot;
  pending_tot;
  user_deleted_tot;
  cannot_be_resolved_tot;
  formsuccess = false;
  img_url="http://localhost/issue_register/uploads";
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "name";
    public sortOrder = "asc";
  reg_no = localStorage.getItem('reg_no');
  name = localStorage.getItem('name');
  constructor(public api: ApiService, public fb:FormBuilder) { }

  ngOnInit() {
    this.role=localStorage.getItem('role');
     this.issues_form = this.fb.group({
      seluserid: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      selstatus: ['', Validators.required]


    });
    
       
     
    this.taskeditForm= this.fb.group({
      priority:[''],
      status:[''],
      repaired_on:['',[Validators.required]],
      repaired_by:['',[Validators.required]],
      date_of_resolution:['',[Validators.required]],
      notes:[],
      did:[]
    });
  
 this.getDomainsbyId();
 this.getdetails();
  }
  by;
  Repaired_on1;
  date_of_resolution1;
  details(item) {
    console.log(item);
    this.value1=this.value1;
    this.Repaired_on1=item.repaired_on;
    this.date_of_resolution1=item.date_of_resolution;
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
    if(this.taskeditForm.value.repaired_on._d=='Invalid Date'){
      data['repaired_on'] = this.Repaired_on1;
    }else{
      data['repaired_on'] = this.taskeditForm.value.repaired_on._d;
    }
    if(this.taskeditForm.value.date_of_resolution._d=='Invalid Date'){
      data['date_of_resolution'] = this.date_of_resolution1;
    }else{
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
    this.verified_resolved_tot = '';
    this.resolution_in_progress_tot = '';
    this.pending_tot = '';
    this.user_deleted_tot = '';
    this.cannot_be_resolved_tot = '';
    this.total = '';

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
            console.log(element.status, '-', element.tot);

          });
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

showstatus=true;
  getDomain($event) {
   console.log($event.target.value);
    this.data = '';
    this.total = '';
    this.verified_resolved_tot = '';
    this.resolution_in_progress_tot = '';
    this.pending_tot = '';
    this.user_deleted_tot = '';
    this.cannot_be_resolved_tot = '';
   
  let value={
  'domain':$event.target.value,
  'reg_no':this.reg_no
} 
let value1=$event.target.value;
 
if(value1 == "all")
{
  this.showstatus=false;
  this.getdetails();
}
else{
this.showstatus=true;
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
getImagesbyId(img_id,reg_no){
  console.log(img_id,reg_no);
  
  this.api.getImagesbyId(img_id,reg_no).subscribe(data=>{
    console.log(data);
    this.img_data=data;
     this.modal3.show();
  })
}
imageclose(){
 this.modal3.hide();
}

}
