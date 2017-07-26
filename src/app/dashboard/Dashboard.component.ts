import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
reg_no=localStorage.getItem('reg_no');
 
    constructor(public router:Router,public api:ApiService,private activeR:ActivatedRoute) {
      // console.log(localStorage.getItem('currentUser'));
      // this.getRole();
     }

  ngOnInit() {
        this.activeR.params.subscribe(params=>{
      this.api.livePage=params['livePage'];
      console.log(params['livePage']);
      console.log(this.api.livePage);
      this.getRole()
      
    });    
  }

  
  getRole(){
    console.log(this.reg_no);
    
      this.api.getRole(this.reg_no).subscribe(data=>{
      if(data){
        console.log(data);
       // console.log(data.role,'hello');
         localStorage.setItem('role',data.role);
     }
    });
    console.log('thell');
    
  }
   sidebarchage(type:string){
     this.api.livePage=type;

     
  this.router.navigate(['/dashboard/'+type]);
 
 
}

}
