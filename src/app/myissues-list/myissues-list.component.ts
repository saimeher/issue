import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApiService } from '../api.service';
import { DateComponent } from '../date/date.component';
import { ModalComponent } from '../modal.component';
@Component({
  selector: 'app-myissues-list',
  templateUrl: './myissues-list.component.html',
  styleUrls: ['./myissues-list.component.css']
})
export class MyissuesListComponent implements OnInit {
  @ViewChild('modal1') modal1: ModalComponent;
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
  constructor(public api: ApiService, public fb:FormBuilder) { }

  ngOnInit() {
    this.role=localStorage.getItem('role');
       
     
    this.taskeditForm= this.fb.group({
      priority:[''],
      status:[''],
      repaired_on:[''],
      repaired_by:[''],
      date_of_resolution:[''],
      notes:[],
      did:[],
    });
  
 this.getDomainsbyId();
 this.getdetails();
  }
  by;
  details(item) {
    console.log(item);
    if (item.repaired_on != null) {
      this.repaired_onn = item.repaired_on
    } else {
      this.repaired_onn = "YYYY-M-D"
    }

    if (item.date_of_resolution != null) {
      this.date_of_resolutionn = item.date_of_resolution
    } else {
      this.date_of_resolutionn = "YYYY-M-D"
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
    data['repaired_on'] = this.taskeditForm.value.repaired_on._d;
    data['repaired_by'] = this.taskeditForm.value.repaired_by;
    data['date_of_resolution'] = this.taskeditForm.value.date_of_resolution._d;
    data['notes'] = this.taskeditForm.value.notes;
    console.log(data);

    this.api.UPDATEISSUE(data)
      .subscribe(
      data => {
        console.log(data);

        // this.taskeditForm.reset();
        this.modal1.hide();
        this.getdetails();
        // this.ngOnInit();

      });
  }

  getdetails() {

    this.api.getdetails(this.reg_no).subscribe(data => {

      this.data1 = data;
      this.data1.forEach(element => {
        if (element.domain == 'ac') {
          this.AC.push(element);
          this.AC_LENGTH = this.AC.length;
        }
        if (element.domain == 'electrical') {
          this.ELECTRICAL.push(element);
        }
        if (element.domain == 'civil') {
          this.CIVIL.push(element);
        }
        if (element.domain == 'water_supply') {
          this.WATER_SUPPLY.push(element);
        }
        if (element.domain == 'sanitation') {
          this.SANITATION.push(element);
        }
        if (element.domain == 'carpentary') {
          this.CARPENTARY.push(element);
        }
        if (element.domain == 'transportation') {
          this.TRANSPORTATION.push(element);
        }
        if (element.domain == 'house_keeping') {
          this.HOUSE_KEEPING.push(element);
        }
        if (element.domain == 'gardening') {
          this.GARDENING.push(element);
        }
        if (element.domain == 'misc') {
          this.MISC.push(element);
        }
        if (element.domain == 'infrastructure') {
          this.INFRASTRUCTURE.push(element);
        }
      });
      console.log(this.AC);
      //this.AC.push({'length':this.AC_LENGTH})
      console.log(this.ELECTRICAL);

      console.log(this.data1 + 'sdfsd');

    })
    console.log(this.data1);
    // cons
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


  getDomain(value: any) {
    this.table = true;
    console.log(value);

    switch (value) {
      case 'ac': this.data1 = this.AC; break;
      case 'electrical': this.data1 = this.ELECTRICAL; break;
      case 'civil': this.data1 = this.CIVIL; break;
      case 'water_supply': this.data1 = this.WATER_SUPPLY; break;
      case 'sanitation': this.data1 = this.SANITATION; break;
      case 'carpentary': this.data1 = this.CARPENTARY; break;
      case 'transportation': this.data1 = this.TRANSPORTATION; break;
      case 'infrastructure': this.data1 = this.INFRASTRUCTURE; break;
      case 'house_keeping': this.data1 = this.HOUSE_KEEPING; break;
      case 'gardening': this.data1 = this.GARDENING; break;
      case 'misc': this.data1 = this.MISC; break;

    }

  }
}
