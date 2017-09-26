// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-addrole',
//   templateUrl: './addrole.component.html',
//   styleUrls: ['./addrole.component.css']
// })
// export class AddroleComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApiService } from '../api.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
})
export class AddroleComponent implements OnInit {
    cities: SelectItem[];
  updateids: SelectItem[];
  selectedCities: string[] = [];
  defaultSelect;
  domainUpdateForm: FormGroup;
  error = false;
  errorMessage = '';
  isRequesting = false;
  buttonClicked = false;
  tot_users = [];
  details = [];
  rolesform: FormGroup;
  domains;
  domainsList;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,public api: ApiService
     ) {
     const bodyData = {};
    bodyData['token'] = localStorage.getItem('currentUser')
    bodyData['utype'] = localStorage.getItem('utype');
    this.api.getStaffData(bodyData).subscribe(data => {
     
      if (data.success) {
        this.cities = [];
        this.tot_users = data.data.data;
        this.tot_users.forEach(element => {
          this.cities.push({ label: element.name + '-' + element.reg_no, value: element.reg_no });


        });
        console.log(this.cities,'test');
      }
    });
     this.domainUpdateForm = this.fb.group({
      'domain': ['', [Validators.required]],
      'domain_title': ['', [Validators.required]],
      'domain_info': ['', [Validators.required]],
      'domain_admin': ['', [Validators.required]]
    });
  }



  ngOnInit() {
   // this.roles();
    this.staffData();
     
    this.rolesform = this.fb.group({
      'domain': ['', [Validators.required ]],
      'domain_admin': ['', [Validators.required]] 
      
    });
    this.getCategories();
  }

  // roles() {
  //   const bodyData = {};
  //   bodyData['token'] = localStorage.getItem('currentUser')
  //   bodyData['role'] = localStorage.getItem('role')
  //   this.api.getRole(bodyData)
  //     .subscribe(response => {
  //       this.details = response.data;
  //     });
  // }


  staffData() {
    const bodyData = {};
    bodyData['token'] = localStorage.getItem('currentUser')
    bodyData['utype'] = localStorage.getItem('utype');
    console.log(bodyData);
    
    this.api.getStaffData(bodyData).subscribe(data => {
      if (data.success) {
        this.tot_users = data.data.data;
        console.log(data);
        
      }
    });
  }


  getCategories() {
    this.api.getCategories().subscribe(categories => {
      if (categories) {
        console.log(categories);

        this.domains = categories;
        this.domainsList = categories;
      }
    })
  }

  // delete(data) {
  //   const bodyData = {};
  //   bodyData['token'] = localStorage.getItem('currentUser');
  //   bodyData['role'] = localStorage.getItem('role');
  //   bodyData['id'] = data.id;
  //   bodyData['reg_no'] = data.reg_no;
  //   bodyData['college'] = data.college;
  //   this.api.getroledelete(bodyData)
  //   .subscribe(data => {
  //     if (data.success == true) {
  //       this.roles();
  //     }
  //   });
  // }

  addFormStatus = false;
  showAddForm() {
    this.addFormStatus = true;
  }
  hideAddForm() {
    this.addFormStatus = false;
  }



  addincharge() {
    
     console.log(this.rolesform.value);
     
           
      this.api.updateIncharge(this.rolesform.value)
        .subscribe(data => {
          if (data.success == true) {
            this.errorMessage = 'successful Updated.';
            confirm(this.errorMessage);
            this.rolesform.reset();
         
          } else {
            this.error = true;
            this.errorMessage = data.error;
            confirm(this.errorMessage);
          }
          this.isRequesting = false;
          this.buttonClicked = false;
        });
    
  }

  UpdateForm = false;
  array;
      getDimensionsByFilter(id){
  return this.tot_users.filter(x => x.reg_no === id);
}
  updatePage(value: any) {
    this.updateids = [];
    //console.log(value);
    //console.log(value.domain_admin);
    let string = value.domain_admin;
    this.array = string.split(',');

    console.log(this.array);
     
    this.array.forEach(element => {
      console.log(element);
     
     let test = this.getDimensionsByFilter(element);
console.log(test);
      this.updateids.push({ 'label': test[0].name , 'value': test[0].reg_no });
       //this.defaultLabel = element;
        this.defaultSelect = test[0].name+test[0].reg_no;
       this.selectedCities.push(this.defaultSelect);
    });
    console.log(this.updateids);
    
                         
    const bodyData = {};
    bodyData['token'] = localStorage.getItem('currentUser')
    bodyData['utype'] = localStorage.getItem('utype');
    this.api.getStaffData(bodyData).subscribe(data => {
      if (data.success) {
          this.tot_users = data.data.data;
          this.tot_users.forEach(element => {
          this.updateids.push({ 'label': element.name + '-' + element.reg_no, 'value': element.reg_no });
          
          
        });
      }
    });
    this.UpdateForm = true;
    this.domainUpdateForm.patchValue(value);
    //this.addForm = false;
  }



}
