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
import {DropdownModule} from 'primeng/primeng';

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
  dropdownList = [];
  showusers=[];
  dropdownSettings ={};
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
          // this.cities.push({label: element.name, value:{ name:  element.reg_no }});
        });
      }
    });
    // this.api.getStaffData(bodyData).subscribe(dataa => {
    //   console.log(dataa);
    //   for (var i = 0; i < dataa.data.data.length; i++) {
    //       this.dropdownList[i] = new Object();
    //       this.dropdownList[i]["id"] = dataa.data.data[i].reg_no;
    //       this.dropdownList[i]["itemName"] = dataa.data.data[i].reg_no + ' - ' + dataa.data.data[i].name;
    //   }
    // });

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
    this.dropdownSettings = {
      singleSelection: false,
      text: " Select ",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 4,
      // disabled:true
 
    };

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
// console.log(value);
//     let temp =  value.domain_admin.split(",")
//     console.log(temp,temp.length);
//     this.showusers=[];
//      for(let j=0;j<temp.length; j++){
//       this.showusers[j]= new Object();
//       this.showusers[j]['id'] = value.domain_admin;
//       this.showusers[j]['itemName'] =value.domain_admin;
//     }
//     console.log('fully arrya',this.showusers);
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
        this.domainUpdateForm.reset();
        this.updateids =[];
        this.getCategories();
        console.log('successfully inserted');
      }
    });
  }


change($event){
  console.log('hi');
  
  console.log($event);
  
}

onItemSelect(item: any) {
  console.log(item);
  // this.id = item.id;
  // this.name1 = item.itemName;
}
OnItemDeSelect(item: any) {
  console.log(item);
}



}
