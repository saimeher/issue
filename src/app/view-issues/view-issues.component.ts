import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ApiService} from '../api.service';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import {DateComponent} from '../date/date.component';
import { ModalComponent } from '../modal.component';
@Component({
  selector: 'app-view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.css']
})
export class ViewIssuesComponent implements OnInit {
    @ViewChild('modal1') modal1: ModalComponent;
     @ViewChild('day') dayElement: ElementRef;
issues_form:FormGroup;
issuesList;
categoriesList;
table=false;
id;
on;
by;
resolution;
notes;
start_date;
end_date;
//data:any;
 public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "name";
    public sortOrder = "asc";
  constructor(public api:ApiService, public fb:FormBuilder) { }

  ngOnInit() {
    this.issues_form= this.fb.group({
      seluserid:[''],
      from_date:[''],
      to_date:[''],
      selstatus:[''],
      selstatus1:[]
    });
   // this.getIssuesList();
    this.getCategories();
  }

 

getCategories(){
  this.api.getCategories().subscribe(categories=>{
    if(categories){
      console.log(categories);
      
      this.categoriesList=categories;
    }
  })
}

 details(item) {
   this.id= item.did;
   this.on=item.repaired_on;
   this.by=item.repaired_by;
   this.resolution=item.date_of_resolution;
   this.notes=item.notes;

  // this.name=project.name;
  // this.city=project.city;
        this.modal1.show();
        // this.taskedForm.patchValue(value);
    }

selCategory($event){
  this.data='';
  console.log('his',$event.target.value);
  let value=$event.target.value;
  this.api.getIssuesListbyCategory(value).subscribe(sellist=>{
    if(sellist){
      console.log(sellist);
      
        this.data=sellist;
    }else{
        this.data='';
    }
    
  })
  
}
from_date;
to_date;
dateChanged(date,$event){
  switch(date){
    case  'start_date' :   this.from_date=$event;  break;
     case  'end_date' :   this.to_date=$event;  break;

  }
  console.log(this.from_date);
    console.log(this.to_date);
  }

selection={};
getSelIssueData(){
  this.data='';
  this.selection['category']=this.issues_form.value.seluserid;
   this.selection['status']=this.issues_form.value.selstatus;
    this.selection['from_date']=this.from_date;
     this.selection['to_date']=this.to_date;
   console.log(this.selection);
   this.api.getIssuesListBySelection(this.selection).subscribe(data=>{
     if(data){
       this.data=data;
     }
   })
    // console.log(this.issues_form.value.selstatus);
 }

}
