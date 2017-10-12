import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApiService } from '../api.service';
import { DateComponent } from '../date/date.component';
import { ModalComponent } from '../modal.component';
import { UploadService } from '../upload.service';
import { SelectItem } from 'primeng/primeng';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-resolution',
  templateUrl: './resolution.component.html',
  styleUrls: ['./resolution.component.css']
})
export class ResolutionComponent implements OnInit {
  model3: any;
  tot_users;
  defaultLabel;
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    timeout: 5000
  });


  cities: SelectItem[];
  selectedCities: string[];
  @ViewChild('day') dayElement: ElementRef;
  @ViewChild('modal1') modal1: ModalComponent;
  @ViewChild('modal2') modal2: ModalComponent;
  @ViewChild('modal3') modal3: ModalComponent;
  @ViewChild('modal4') modal4: ModalComponent;
  public toasterService: ToasterService;
  
  constructor(public api: ApiService, public fb: FormBuilder, public upservice: UploadService,toasterService: ToasterService) {
    this.toasterService = toasterService;
  }
  resolutioninform: FormGroup;
  resolutionclosedform: FormGroup;
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
  issuedescription;
  today = new Date().toISOString().slice(0, 10);
  today1 = new Date();
  expected_resolution_date = '';
  repaired_on;
  showdays = '';
  //img_url = "http://localhost/issue_register/uploads";
  img_url = "http://210.16.79.137/raghuerp/issueregister/server/uploads";


  ngOnInit() {
    let date = new Date();
    this.resolutioninform = this.fb.group({
      // expected_resolution_date: {
      //   date: {
      //     year: date.getFullYear(),
      //     month: date.getMonth() + 1,
      //     day: date.getDate()
      //   }
      // },
      resolutiontext: [''],
      expected_resolution_date: [''],
      status: [''],
      cannottext: [''],
      onholdtext: [''],
      repairedtext:[''],
    });
    this.resolutionclosedform = this.fb.group({
      repairedtext: [''],
      // repaired_on: {
      //   date: {
      //     year: date.getFullYear(),
      //     month: date.getMonth() + 1,
      //     day: date.getDate()
      //   }
      // },

      // repaired_on: ['']
    });

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


  details(item) {
    this.did = item.did;
    this.domain1 = item.domain;
    this.issuedescription = item.issue_desc;
    this.resolutioninform.patchValue(item);
    console.log(item);
    this.modal1.show();
  }

  close() {
    this.resolutioninform.reset();
    this.modal1.hide()
  }


  resolutioninprogress() {
    console.log('date is', this.expected_resolution_date);
    console.log(this.resolutioninform.value);
    let value = {};
    value['expected_resolution_date'] = this.expected_resolution_date;
    value['resolutiontext'] = this.resolutioninform.value.resolutiontext;
    value['onholdtext'] = this.resolutioninform.value.onholdtext;
    value['cannottext'] = this.resolutioninform.value.cannottext;
    value['did'] = this.did;
    value['status'] = this.resolutioninform.value.status;
    value['repairedtext'] = this.resolutioninform.value.repairedtext;
    console.log(value);
    this.api.resolutioninprogress(value).subscribe(data1 => {
      if (data1) {
        console.log(data1);
        this.data1 = data1;
        this.resolutioninform.reset();
        this.popToast();
        this.modal1.hide();
        this.getissuesinprogress();
      }
    })
  }


  closed(item) {
    this.did = item.did;
    this.domain1 = item.domain;
    this.issuedescription = item.issue_desc;
    console.log(item);
    this.modal2.show();
  }

  resolutionclosed() {
    console.log('date is', this.expected_resolution_date);
    console.log(this.resolutionclosedform.value);
    let value = {};
    // value['repaired_on'] = this.repaired_on;
    value['repairedtext'] = this.resolutionclosedform.value.repairedtext;
    value['did'] = this.did;
    console.log(value);
    this.api.resolutionclosed(value).subscribe(data2 => {
      if (data2) {
        console.log(data2);
        this.data1 = data2;
        this.resolutionclosedform.reset();
        this.popToast();
        this.modal2.hide();
        this.getissuesinprogress();
      }
    })
  }
  close2() {
    this.resolutionclosedform.reset();
    this.modal2.hide()
  }


  getissuesinprogress() {
    this.api.getissuesinprogress(this.reg_no).subscribe(data => {
      this.data = data.data;
      console.log(this.data);
    })
  }
  delete1() {
    let data = {}
    data['did'] = this.did;
    this.api.DELETEISSUE(data).subscribe(det => {
      console.log(det);


    })
    console.log(data);
    this.modal2.hide();
  }
  delete(item) {
    this.did = item.did;
    this.issue = item.issue_desc;
    console.log(item);
    // this.issues_form.patchValue(item);
    this.modal2.show();
  }
  close1() {
    this.modal2.hide();
  }
  picName;
  onChange(event) {
    let param = [];
    param['reg_no'] = this.reg_no;
    console.log('onChange', event);
    var files = event.srcElement.files;
    this.picName = files;
    console.log(files);

  }

  img_data;
  getImagesbyId(img_id, reg_no) {
    console.log(img_id, reg_no);

    this.api.getImagesbyId(img_id, reg_no).subscribe(data => {
      console.log(data);
      this.img_data = data;
      this.modal3.show();
    })
  }
  imageclose() {
    this.modal3.hide();
  }
  updateimg_id;
  updateImagepopup(id: any) {

    this.modal4.show();
    this.modal3.hide();
    console.log(id);
    this.updateimg_id = id;
    // this.api.updateImage(id).subscribe(data=>{
    //   console.log(data);

    // })
  }
  updateFile: any;
  imageChange(event) {

    console.log('onChange', event);
    var files = event.srcElement.files;
    this.updateFile = files;
    console.log(files);

  }

  updateImage(id: any) {
    if (this.updateFile) {
      this.upservice.makeFileRequest('http://210.16.79.137/raghuerp/issueregister/server/api/update_docs', id, this.updateFile).subscribe(data => {
        // this.upservice.makeFileRequest('http://localhost/issue_register/api/update_docs', id, this.updateFile).subscribe(data=> {

      });
      this.updateimg_id = '';
      this.modal4.hide();
    }
  }

  updateclose() {
    this.updateimg_id = '';
    this.modal4.hide();
  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    editableDateField: false,
    disableWeekends: false,
    // disableDays: this.service.holidays,
    disableUntil: { year: this.today1.getFullYear(), month: this.today1.getMonth() + 1, day: this.today1.getDate() - 1 }
    // disableUntil: {year: , month: 5 , day: 17}

  };


  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mmm-dd',
    editableDateField: false,
    disableWeekends: false,

    //  disableDays: this.service.holidays,
    disableUntil: { year: 0, month: 0, day: 0 }
    // disableUntil: {year: , month: 5 , day: 17}

  };
  picker1day;
  picker1month;
  picker1year;

  onDateChanged3(event: IMyDateModel) {
    // this.expected_resolution_date = event.formatted;
    this.expected_resolution_date = event.date.year + '-' + event.date.month + '-' + event.date.day;
    console.log(this.expected_resolution_date, 'from date test');
  }
  onDateChanged2(event: IMyDateModel) {
    // this.repaired_on = event.formatted;
    this.repaired_on = event.date.year + '-' + event.date.month + '-' + event.date.day;
    console.log(this.repaired_on, 'from date test');
  }
  selStataus($event) {
    this.showdays = $event.target.value;
    console.log(this.showdays);

  }


  popToast() {
    this.toasterService.pop('success', '', 'Successfully submitted your request');
  }

}


