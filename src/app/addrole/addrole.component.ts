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
  selectedCities: string[];
  buttonClicked = false;
  domainForm: FormGroup;
  domainUpdateForm: FormGroup;
  domainsList;
  tot_users;
  defaultLabel;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, public api: ApiService) {
    const bodyData = {};
    bodyData['token'] = localStorage.getItem('currentUser')
    bodyData['utype'] = localStorage.getItem('utype');
    this.api.getStaffData(bodyData).subscribe(data => {
      this.defaultLabel='choose';
      if (data.success) {
        this.cities = [];
        this.tot_users = data.data.data;
        this.tot_users.forEach(element => {
          this.cities.push({ label: element.name + '-' + element.reg_no, value: element.reg_no });

        });
      }
    });

  }

  ngOnInit() {
    this.domainForm = this.fb.group({
      'domain': ['', [Validators.required]],
      'domain_title': ['', [Validators.required]],
      'domain_info': ['', [Validators.required]],
      'domain_admin': ['', [Validators.required]]
    });
    this.domainUpdateForm = this.fb.group({
      'domain': ['', [Validators.required]],
      'domain_title': ['', [Validators.required]],
      'domain_info': ['', [Validators.required]],
      'domain_admin': ['', [Validators.required]]
    });
    this.getCategories();

  }

  addDomain() {
    console.log(this.domainForm.value);
    this.api.addDomain(this.domainForm.value).subscribe(data => {
      if (data) {
        this.addForm = false;
        this.getCategories();
        console.log('successfully inserted');

      }
    });
  }
  UpdateForm = false;
  array;
   
  updatePage(value: any) {
    this.updateids = [];
    //console.log(value);
    //console.log(value.domain_admin);
    let string = value.domain_admin;
    this.array = string.split(',');

    console.log(this.array);
     
    this.array.forEach(element => {
      console.log(element);
      this.updateids.push({ 'label': element, 'value': element });
       this.defaultLabel = element;
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
    this.addForm = false;
  }

  getCategories() {
    this.api.getCategories().subscribe(categories => {
      if (categories) {
        console.log(categories);

        this.domainsList = categories;
      }
    })
  }
  addForm = false;
  showAddForm() {
    this.addForm = true;
  }

  hideAddForm() {
    this.addForm = false;
  }

  hideUpdateForm() {
    this.UpdateForm = false;
  }

  UpdateDomain() {
    console.log(this.domainUpdateForm.value);

    this.api.updateDomain(this.domainUpdateForm.value).subscribe(data => {
      if (data) {
        this.UpdateForm = false;
        this.getCategories();
        console.log('successfully inserted');
      }
    });
  }


change($event){
  console.log('hi');
  
  console.log($event);
  
}



}
