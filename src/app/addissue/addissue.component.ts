import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApiService } from '../api.service';
import { DateComponent } from '../date/date.component';
import { ModalComponent } from '../modal.component';
import { UploadService} from '../upload.service';
@Component({
  selector: 'app-addissue',
  templateUrl: './addissue.component.html',
  styleUrls: ['./addissue.component.css']
})
export class AddissueComponent implements OnInit {
  model3: any;
  @ViewChild('day') dayElement: ElementRef;
  @ViewChild('modal1') modal1: ModalComponent;
  @ViewChild('modal2') modal2: ModalComponent;
  @ViewChild('modal3') modal3: ModalComponent;
  @ViewChild('modal4') modal4: ModalComponent;
  constructor(public api: ApiService, public fb: FormBuilder,public upservice:UploadService) { }
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
 
  //img_url = "http://localhost/issue_register/uploads";
  img_url="http://210.16.79.137/issueregister/server/uploads";
 
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
      from_date: []
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
    // this.delete();
  }


  showAddForm() {
    this.addFormStatus = true;
  }
  hideAddForm() {
    this.addFormStatus = false;
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
      if(this.picName){        
          this.upservice.makeFileRequest('http://210.16.79.137/issueregister/server/api/insert_docs', id, this.picName).subscribe(() => {
      //this.upservice.makeFileRequest('http://localhost/issue_register/api/insert_docs', id, this.picName).subscribe(() => {

       // console.log('sent');
       
     });
    }
        this.issues_form.reset();
       // this.getdetails();
        this.addFormStatus = false;
        this.getissue();
 
      });
  }

  details(item) {
    this.did=item.did;
    console.log(item);
    this.issues_form.patchValue(item);
    this.modal1.show();
  }
  
  close() {
    this.issues_form.reset();
    this.modal1.hide()
  }
  

  

getissue()
{
  this.api.getissue(this.reg_no).subscribe(data=>{
    this.data=data;
  })
  
  console.log(this.data);
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
    this.getissue();
    this.modal1.hide();
  });


}
 delete1()
  {
    let data={}
    data['did']=this.did;
  this.api.DELETEISSUE(data).subscribe(det=>{
      console.log(det);
       this.getissue();
       
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
          this.upservice.makeFileRequest('http://210.16.79.137/issueregister/server/api/update_docs', id, this.updateFile).subscribe(data=> {
        // this.upservice.makeFileRequest('http://localhost/issue_register/api/update_docs', id, this.updateFile).subscribe(data=> {

        console.log(data);
       if(data){
       this.updateimg_id='';
       this.modal4.hide();
       this.getissue();
       }
     });
    }
}

updateclose(){
  this.updateimg_id='';
 this.modal4.hide();
}
 
}
