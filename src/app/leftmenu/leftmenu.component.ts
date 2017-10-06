import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {

 @Output() selectedpage=new EventEmitter();
  
name=localStorage.getItem('name');
reg_no=localStorage.getItem('reg_no');
gender = localStorage.getItem('gender');
dp =   localStorage.getItem('dp');
role;
img;
utype;

  constructor(public api:ApiService,public router:Router) {
    // this.api.getRole(this.user_id).subscribe(data=>{
    //   if(data){
    //     this.role=data.role
    //   }
    // });
    console.log(this.dp);
    console.log(this.gender);
       if (this.dp != '' && this.dp != 'null' ) {
        this.img = "http://210.16.79.137/raghuerp/server/img/dps/" + this.dp;
      }
      else {
        if (this.gender == 'M') {
          this.img = "http://210.16.79.137/raghuerp/server/img/dps/M.png";
        }
        else if (this.gender == 'F') {
          this.img = "http://210.16.79.137/raghuerp/server/img/dps/F.png";
        }
         else {
          this.img = "http://210.16.79.137/raghuerp/server/img/dps/no_dp.jpg";
        }
      }
    this.getRole();

   }

  ngOnInit() {
   
  }

  sidebarchage(type:any){
    this.selectedpage.emit(type); 
    this.api.livePage=type;
   // console.log(this.api.livePage);
    
  }
 
  getRole(){
    console.log(this.reg_no);
    
      this.api.getRole(this.reg_no).subscribe(data=>{
      if(data.data){
          console.log(data.data);
        // console.log(data.role,'hello');
        if(data.data=='failed'){
          localStorage.setItem('role','other');
          console.log('fail case');
          
          this.role='other';
           this.api.livePage='addissue';
        }
        else
        {
        this.role=data.data.role;
         localStorage.setItem('role',data.data.role);
         if(this.role=='adm'){
          this.api.livePage='viewissues';
         }
        else{
           this.api.livePage='addissue';
         }
        }
       
     }
    });
     
    
  }

  // getRole(){
  //   console.log(this.reg_no);
    
  //     this.api.getRole(this.reg_no).subscribe(data=>{
  //     if(data){
  //       console.log(data);
  //      // console.log(data.role,'hello');
  //      this.role=data.role;
  //        localStorage.setItem('role',data.role);
  //    }
  //   });
  //   console.log('thell');
    
  // }
  //  logout(){
   
  //     // console.log(localStorage.getItem('currentUser'));
  //     // console.log(localStorage.removeItem('currentUser'));
  //       localStorage.removeItem('currentUser');
  //       localStorage.removeItem('reg_no');
  //       localStorage.removeItem('name');
  //       localStorage.removeItem('role');
  //       localStorage.removeItem('gender');
  //       localStorage.removeItem('dp');
  //        localStorage.removeItem('utype');
  //     // this.router.navigate(['login']);
   
      
  // }
}
