import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [ApiService]
})
export class LoginComponent implements OnInit {
  login_form: FormGroup;
  error_msg = false;
  msg;
  user_role:any;
  constructor(public router: Router, public fb: FormBuilder, public api: ApiService) {
    this.login_form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  login() {
     console.log(this.login_form.value);
    this.api.loginCheck(this.login_form.value).subscribe(data => {
     if (data!='failure') {
      // if (data) {
        console.log(data);
        console.log(data.utype);
      //  if(data.role=='cr'){
        localStorage.setItem('currentUser', data.token);
        localStorage.setItem('reg_no',data.reg_no);
        localStorage.setItem('name',data.name);
        localStorage.setItem('gender',data.gender);
        localStorage.setItem('dp',data.dp);
       // localStorage.setItem('role',data.utype);  
        this.router.navigate(['dashboard']);
      } else {
        this.error_msg=true;
        this.msg='Invalid Username or Password';
      }

    });

  }
 
}