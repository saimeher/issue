import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApiService } from '../api.service';
import { DateComponent } from '../date/date.component';
import { ModalComponent } from '../modal.component';
@Component({
  selector: 'app-addissue',
  templateUrl: './addissue.component.html',
  styleUrls: ['./addissue.component.css']
})
export class AddissueComponent implements OnInit {
  @ViewChild('day') dayElement: ElementRef;
  @ViewChild('modal1') modal1: ModalComponent;

  constructor(public api: ApiService, public fb: FormBuilder) { }
  issues_form: FormGroup;
  taskeditForm: FormGroup;
  role;
  data1;
  id;
  data2;
  domain;
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
  formsuccess = false;
  reg_no = localStorage.getItem('reg_no');
  name = localStorage.getItem('name');
  // domains: Array<{ title: string, value: string }>;
  domains: Array<any> = [
    { title: 'Electrical', info: 'Electrical (Fans / Lights / Power Supply / Motors / Line)', value: 'electrical' },
    { title: 'Civil', info: 'Civil (Building / Walls / Roof / Leakages / Flooring…)', value: 'civil' },
    { title: 'Water Supply', info: 'Water Supply (Drinking Water - Non-availability / Unclean / Leakages / Broken Taps / Broken Pipes...)', value: 'water_supply' },
    { title: 'Sanitation', info: 'Sanitation (Normal Water - Non-availability / Leakages / Broken Taps / Broken Pipes / Smell / Breakage of Washroom Equipment / Doors…)', value: 'sanitation' },
    { title: 'Carpentary', info: 'Carpentry (Tables / Benches / Doors…)', value: 'carpentary' },
    { title: 'AC', info: 'AC (Wherever Available - Leakages / Not working / Tripping / No effect)', value: 'ac' },
    { title: 'Transportation', info: 'Transportation (Bus / Route / Accident….)', value: 'transportation' },
    { title: 'Infrastructure', info: 'Infrastructure (General Infrastructure - Phone, Internet / Intranet …)', value: 'infrastructure' },
    { title: 'House keeping', info: 'House keeping (Cleaning, Security)', value: 'house_keeping' },
    { title: 'Gardening', info: 'Gardening, Cattle Maintenance', value: 'gardening' },
    { title: 'Miscellaneous', info: 'Miscellaneous (any others such as Postal Delivery …that are not covered above)', value: 'misc' }
  ];






  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.issues_form = this.fb.group({
      domain: [''],
      location: [''],
      problem: [''],
      issue_desc: [],
      from_date: [],
      did: [],
    });
    this.taskeditForm = this.fb.group({
      priority: [''],
      status: [''],
      repaired_on: [''],
      repaired_by: [''],
      date_of_resolution: [''],
      notes: [],
      did: [],
    });

   // this.getDomainsbyId();
   // this.getdetails();
    this.getissue();
  }


  showAddForm() {
    this.addFormStatus = true;
  }
  hideAddForm() {
    this.addFormStatus = false;
  }
  getSelIssueData() {
    if(this.issues_form.value.did!=null){
      console.log(this.issues_form.value,'fsd');
      console.log(this.issues_form.value.did);
      this.api.modifyIssue(this.issues_form.value).subscribe(data=>{
        if(data){
          this.issues_form.reset();
        }
      })
      
    }else{
      console.log(this.issues_form.value.did,'hello');
      
    let data = {}
    data['domain'] = this.issues_form.value.domain;
    data['location'] = this.issues_form.value.location;
    data['problem'] = this.issues_form.value.problem;
    data['issue_desc'] = this.issues_form.value.issue_desc;
    data['raised_by'] = this.name;
    data['reg_no'] = this.reg_no;
    this.api.INSERTISSUE(data)
      .subscribe(data => {
        this.issues_form.reset();
        this.getissue();
       // this.getdetails();
        this.addFormStatus = false;
        console.log(data);
        // console.log(this.issues_form.value);
      });
    }
    
  }

  details(item) {
    console.log(item);
    this.issues_form.patchValue(item);
    this.modal1.show();
  }
  close() {
    this.taskeditForm.reset();
    this.modal1.hide()
  }
  // getMyList(){
  //   this.api.getMyList(this.reg_no).subscribe(data =>{

  //   });
  // }
getissue()
{
  this.api.getissue(this.reg_no).subscribe(data=>{
    this.data2=data;
  })
  
  //console.log(this.data2);
}
   

}
