import { Component, OnInit, ElementRef,ViewChild,Output,EventEmitter} from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApiService} from '../api.service';
import {DateComponent} from '../date/date.component';
import { ModalComponent } from '../modal.component';
@Component({
  selector: 'app-addissue',
  templateUrl: './addissue.component.html',
  styleUrls: ['./addissue.component.css']
})
export class AddissueComponent implements OnInit {
  @ViewChild('day') dayElement: ElementRef;
    @ViewChild('modal1') modal1: ModalComponent;
   @Output() dateChange = new EventEmitter();
  constructor(public api:ApiService, public fb:FormBuilder) { }
  issues_form:FormGroup;
  taskeditForm:FormGroup;
  role;
  data1;

  id;
  data2;
  repaired_on;
  status;
  repaired_by;
  notes;
  priority;
  did;
  by;
  value;
  date_of_resolution;
  formsuccess = false;
   reg_no = localStorage.getItem('reg_no');
   name=localStorage.getItem('name');
  // domains: Array<{ title: string, value: string }>;
  domains :Array<any> =[
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
  
  domain;

   
 

  ngOnInit() {
    this.role=localStorage.getItem('role');
       
    this.issues_form = this.fb.group({
      domain: [''],
      location: [''],
      problem: [''],
      issue_desc: [],
      from_date:[]
    });
    this.taskeditForm= this.fb.group({
      priority:[''],
      status:[''],
      repaired_on:[''],
      repaired_by:[''],
      date_of_resolution:[''],
      notes:[]
    });
    let day= new Date();
    this.dateChange.emit('2016-09-16');
   // this.getIssuesList();
   // this.getCategories();
  
   this.getDomainsbyId();
 this.getdetails();
  }
  
  addFormStatus = false;
  table = false;
  showAddForm() {
    this.addFormStatus = true;
  }
  hideAddForm() {
    this.addFormStatus = false;
  }
  getSelIssueData() {
    let data={}
     data['domain']= this.issues_form.value.domain;
     data['location']= this.issues_form.value.location;
     data['problem']= this.issues_form.value.problem;
     data['issue_desc']= this.issues_form.value.issue_desc;
     data['raised_by']= this.name;
    this.api.INSERTISSUE(this.issues_form.value)
      .subscribe( data => {
        this.issues_form.reset();
        this.addFormStatus=false;
        console.log(data);
       // console.log(this.issues_form.value);
       
      });
  }
  details(item)
{
  console.log(item);
  this.taskeditForm.patchValue(item);
//   this.by=item.raised_by;
//   this.date_of_resolution=item.date_of_resolution;
// this.did=item.did;
// this.notes =item.notes;
// this.repaired_on =item.repaired_on;
// this.repaired_by=item.repaired_by;
// this.status=item.status;
// this.priority=item.priority;
 this.modal1.show();
}
editTask() {
  let data={};
  console.log(this.taskeditForm.value.repaired_on._i);
  console.log(this.taskeditForm.value);
  
  data['did'] =this.did;
  data['status'] = this.taskeditForm.value.status;
  data['priority']= this.taskeditForm.value.priority;
  data['repaired_on']=this.taskeditForm.value.repaired_on._i;
  data['repaired_by']=this.taskeditForm.value.repaired_by._i;
   data['date_of_resolution']=this.date_of_resolution;
   data['notes']=this.taskeditForm.value.notes;
console.log(data);

    // this.api.UPDATEISSUE(data)
    //   .subscribe(
    //   data => {
    //     console.log(data);
   
    //     // this.taskeditForm.reset();
    //     this.modal1.hide();
    //       // this.ngOnInit();
       
    //   });
  }
AC=[];
AC_LENGTH;
ELECTRICAL=[];
CIVIL=[];
WATER_SUPPLY=[];
SANITATION=[];
CARPENTARY=[];
TRANSPORTATION=[];
HOUSE_KEEPING=[];
GARDENING=[];
MISC=[];
INFRASTRUCTURE=[];
getdetails(){
  
   this.api.getdetails(this.reg_no).subscribe(data=>{
     
       this.data1=data;
       this.data1.forEach(element => {
           if(element.domain=='ac'){ 
             this.AC.push(element);
             this.AC_LENGTH=this.AC.length;
             }
           if(element.domain=='electrical'){
             this.ELECTRICAL.push(element);
            }
           if(element.domain=='civil'){
             this.CIVIL.push(element);
           }
           if(element.domain=='water_supply'){
             this.WATER_SUPPLY.push(element);
           }
           if(element.domain=='sanitation'){
             this.SANITATION.push(element);
           }
           if(element.domain=='carpentary'){
             this.CARPENTARY.push(element);
           }
           if(element.domain=='transportation'){
             this.TRANSPORTATION.push(element);
           }
           if(element.domain=='house_keeping'){
             this.HOUSE_KEEPING.push(element);
           }
           if(element.domain=='gardening'){
             this.GARDENING.push(element);
           }
           if(element.domain=='misc'){
             this.MISC.push(element);
           }
           if(element.domain=='infrastructure'){
             this.INFRASTRUCTURE.push(element);
           }
       });
       console.log(this.AC);
       //this.AC.push({'length':this.AC_LENGTH})
        console.log(this.ELECTRICAL);
       
     console.log(this.data1+'sdfsd');
      
   })
  console.log(this.data1);
    // cons
}
domainsbyid;
getDomainsbyId(){
  this.api.getDomainsbyId(this.reg_no).subscribe(data=>{
    if(data){
      this.domainsbyid=data;
      console.log(this.domainsbyid);
      
    }
  })
}
 
 
getDomain(value:any){
  this.table=true;
  console.log(value);
  
switch(value){
case 'ac' : this.data1=this.AC; break;
case 'electrical' : this.data1=this.ELECTRICAL; break;
case 'civil' : this.data1=this.CIVIL; break;
case 'water_supply' : this.data1=this.WATER_SUPPLY; break;
case 'sanitation' : this.data1=this.SANITATION; break;
case 'carpentary' : this.data1=this.CARPENTARY; break;
case 'transportation' : this.data1=this.TRANSPORTATION; break;
case 'infrastructure' : this.data1=this.INFRASTRUCTURE; break;
case 'house_keeping' : this.data1=this.HOUSE_KEEPING; break;
case 'gardening' : this.data1=this.GARDENING; break;
case 'misc' : this.data1=this.MISC; break;

}
   
}



}
