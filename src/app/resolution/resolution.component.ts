import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApiService } from '../api.service';
import { DateComponent } from '../date/date.component';
import { ModalComponent } from '../modal.component';
import { UploadService} from '../upload.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-resolution',
  templateUrl: './resolution.component.html',
  styleUrls: ['./resolution.component.css']
})
export class ResolutionComponent implements OnInit {
  model3: any;
  tot_users;
  defaultLabel;
  
  cities: SelectItem[];
  selectedCities: string[];
  @ViewChild('day') dayElement: ElementRef;
  @ViewChild('modal1') modal1: ModalComponent;
  @ViewChild('modal2') modal2: ModalComponent;
  @ViewChild('modal3') modal3: ModalComponent;
  @ViewChild('modal4') modal4: ModalComponent;
  constructor(public api: ApiService, public fb: FormBuilder,public upservice:UploadService) { 
    
  }
  issues_form: FormGroup;
  taskeditForm: FormGroup;
  role;
  data1;
  data3;
  id;
  data2;
  domain;
  did;
  issue;
  domains;
  domain1;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
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
 categoriesList;
  //img_url = "http://localhost/issue_register/uploads";
  img_url="http://210.16.79.137/raghuerp/issueregister/server/uploads";
 

  ngOnInit() {
    this.role = localStorage.getItem('role');

    // this.getDomainsbyId();
    this.getissuesinprogress();
    // this.delete();
  }


  showAddForm() {
    this.addFormStatus = true;
  }
  hideAddForm() {
    this.addFormStatus = false;
  }
  getCategories() {
    this.api.getCategories().subscribe(categories => {
      if (categories) {
        console.log(categories);

        this.categoriesList = categories;
      }
    })
  }
  getSelIssueData() {
    let data = {}
    data['domain'] = this.issues_form.value.domain;
    data['location'] = this.issues_form.value.location;
    data['problem'] = this.issues_form.value.problem;
    data['issue_desc'] = this.issues_form.value.issue_desc;
    data['raised_by'] = this.name;
    data['reg_no'] = this.reg_no;
    data['uploads'] = this.picName;
    
    this.api.INSERTISSUE(data)
      .subscribe(data => {
        let id=data;
        console.log(id,this.picName);
        
      if(this.picName){        
         this.upservice.makeFileRequest('http://210.16.79.137/raghuerp/issueregister/server/api/insert_docs', id, this.picName).subscribe(() => {
      //  this.upservice.makeFileRequest('http://localhost/issue_register/api/insert_docs', id, this.picName).subscribe(() => {
 
       // console.log('sent');
       
     });
    }
        this.issues_form.reset();
       // this.getdetails();
        this.addFormStatus = false;
       
 
      });
  }

  details(item) {
    this.did=item.did;
    this.domain1=item.domain
    console.log(item);
    this.modal1.show();
  }
  
  close() {
    this.issues_form.reset();
    this.modal1.hide()
  }
  

  

getissuesinprogress()
{
  this.api.getissuesinprogress(this.reg_no).subscribe(data=>{
    this.data=data.data;
    console.log(this.data);
  })
  
  
}
EditIssue()
{
   let data = {}
   data['did'] = this.did;
    data['domain'] = this.issues_form.value.domain;
    data['location'] = this.issues_form.value.location;
    data['problem'] = this.issues_form.value.problem;
    data['issue_desc'] = this.issues_form.value.issue_desc;
    

  this.api.updateissues(data).subscribe(data=>{
    this.data3=data;
    this.issues_form.reset();
   
    this.modal1.hide();
  });


}
 delete1()
  {
    let data={}
    data['did']=this.did;
  this.api.DELETEISSUE(data).subscribe(det=>{
      console.log(det);
     
       
    })
    console.log(data);
   
   
    this.modal2.hide();
    
    
  }
  delete(item) {
    this.did=item.did;
    this.issue=item.issue_desc;
    console.log(item);
    // this.issues_form.patchValue(item);
    this.modal2.show();
  }
  close1()
  {
    this.modal2.hide();
  }
picName;
   onChange(event) {
     let param=[];
     param['reg_no']=this.reg_no;
       console.log('onChange',event);
         var files = event.srcElement.files;
          this.picName = files;
        console.log(files);
         
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
updateimg_id;
updateImagepopup(id:any){
  
  this.modal4.show();
  this.modal3.hide();
  console.log(id);
  this.updateimg_id=id;
  // this.api.updateImage(id).subscribe(data=>{
  //   console.log(data);
    
  // })
}
updateFile:any;
imageChange(event) {
     
       console.log('onChange',event);
         var files = event.srcElement.files;
          this.updateFile = files;
        console.log(files);
         
     }

updateImage(id:any){
     if(this.updateFile){        
          this.upservice.makeFileRequest('http://210.16.79.137/raghuerp/issueregister/server/api/update_docs', id, this.updateFile).subscribe(data=> {
        // this.upservice.makeFileRequest('http://localhost/issue_register/api/update_docs', id, this.updateFile).subscribe(data=> {

     });
      this.updateimg_id='';
       this.modal4.hide();
    }
}

updateclose(){
  this.updateimg_id='';
 this.modal4.hide();
}
}
