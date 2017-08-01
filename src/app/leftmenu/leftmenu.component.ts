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
role;

  constructor(public api:ApiService,public router:Router) {
    // this.api.getRole(this.user_id).subscribe(data=>{
    //   if(data){
    //     this.role=data.role
    //   }
    // });
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
        }else{
        this.role=data.data.role;
         localStorage.setItem('role',data.data.role);
         if(this.role=='adm'){
          this.api.livePage='viewissues';
         }else{
           this.api.livePage='addissue';
         }
        }
       
     }
    });
     
    
  }
   logout(){
   
      // console.log(localStorage.getItem('currentUser'));
      // console.log(localStorage.removeItem('currentUser'));
        localStorage.removeItem('currentUser');
        localStorage.removeItem('reg_no');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
      // this.router.navigate(['login']);
   
      
  }
}
