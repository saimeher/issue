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
role; 
    constructor(public router:Router,public api:ApiService,private activeR:ActivatedRoute) {
      // console.log(localStorage.getItem('currentUser'));
      // this.getRole();
       this.getRole()
     }

  ngOnInit() {
        this.activeR.params.subscribe(params=>{
      this.api.livePage=params['livePage'];
      console.log(params['livePage']);
      console.log(this.api.livePage);
          
    });    
  }

  
  getRole(){
      
      this.api.getRole(this.reg_no).subscribe(data=>{
       if(data.data){
          console.log(data.data);
        // console.log(data.role,'hello');
        if(data.data=='failed'){
          localStorage.setItem('role','other');
          this.role='other';
           this.api.livePage='addissue';
        }
        else{
        this.role=data.data.role;
         localStorage.setItem('role',data.data.role);
         if(this.role=='adm'){
          this.api.livePage='viewissues';
         }
        else
          {
           this.api.livePage='addissue';
         }
        }
      
     }
    });
   
    
  }
   sidebarchage(type:string){
     this.api.livePage=type;
     this.router.navigate(['/dashboard/'+type]);
 }

}
