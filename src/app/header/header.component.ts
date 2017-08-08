import { Component, OnInit,EventEmitter,Output} from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service';

@Component({
selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectedpage=new EventEmitter();
  name=localStorage.getItem('name');
  constructor(public router:Router,public api:ApiService) { }

  ngOnInit() {
  }

  logout(){
   
      //     console.log(localStorage.getItem('currentUser'));
      //  console.log(localStorage.removeItem('currentUser'));
       localStorage.removeItem('currentUser');
        localStorage.removeItem('reg_no');
        localStorage.removeItem('name');
        localStorage.removeItem('role'); 
       localStorage.removeItem('gender');
        localStorage.removeItem('dp');
       
       //this.router.navigate(['login']);
         
  }

  sidebarchage(type:any){
    this.api.livePage=type;
    this.selectedpage.emit(type); 
    this.router.navigate(['/dashboard/'+type]);
    // this.router.navigate(['/home/'+type]);
    
  } 

  // toggle(){
  //   this.api.toggle=true;
  // }
}
