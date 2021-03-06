import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
//import { DayPilot, DayPilotSchedulerComponent } from "daypilot-pro-angular";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UrlService } from './url.service';
@Injectable()
export class ApiService {
  livePage: string;
  constructor(public url: UrlService, public http: Http) { }

  loginCheck(value: any) {

    let body = JSON.stringify(value);
    return this.callApi(this.url.LOGIN_API, 'post', body);
  }

  getRole(id: any = '') {
    let body = JSON.stringify({ 'reg_no': id });
    console.log(body);

    return this.callApi(this.url.GETROLE_API, 'post', body);
  }

  // getIssuesList(){
  //   let body=JSON.stringify({});
  //   return this.callApi(this.url.GETISSUESLIST,'get',body);
  // }

  getCategories() {
    let body = JSON.stringify({});
    return this.callApi(this.url.GETCATEGORIES, 'get', body);
  }

  getIssuesListbyCategory(val: any = '') {
    let body = JSON.stringify({ 'domain': val });
    return this.callApi(this.url.GETISSUESLISTBYCATEGORY, 'post', body);
  }

  getIssuesListBySelection(value: any) {
    let body = JSON.stringify(value);
    return this.callApi(this.url.GETISSUESLISTBYSELECTION, 'post', body);
  }

  INSERTISSUE(value: any) {
    let body = JSON.stringify(value);
    return this.callApi(this.url.INSERTISSUE, 'post', body);
  }
  modifyIssue(value:any){
    let body = JSON.stringify(value);
    return this.callApi(this.url.MODIFYISSUE, 'post', body);
  }
  getdetails(id: any = '') {
    let body = JSON.stringify({ 'reg_no': id });
    return this.callApi(this.url.GETDETAILS, 'post', body);
  }

  getDomainsbyId(id:any=''){
     let body = JSON.stringify({ 'reg_no': id });
    return this.callApi(this.url.GETDOMAINSBYID, 'post', body);
  }
  getissue(id:any='')
  {
    let body=JSON.stringify({'reg_no':id});
    console.log(body)
    return this.callApi(this.url.getissue,'post',body);
  }
 updateissues(value:any)
  {
    let body=JSON.stringify(value);
    console.log(body)
    return this.callApi(this.url.updateissues,'post',body);
  }
UPDATEISSUE(value:any){
let body =JSON.stringify(value);
console.log(value);
return this.callApi(this.url.UPDATEISSUE,'post',body);
  }

  getAllIssues(){
  let body ='';
  return this.callApi(this.url.GETALLISSUES,'get',body);
}

getImagesbyId(id:any,reg_no:any){
  let body=JSON.stringify({'img_id':id,'reg_no':reg_no });
    console.log(body)
    return this.callApi(this.url.getImagesbyId,'post',body);
}

getDatabyId_Domain(val) {
    let body = JSON.stringify(val);
    console.log(body)
    return this.callApi(this.url.getDatabyId_Domain, 'post', body);
  }

DELETEISSUE(value:any){
let body =JSON.stringify(value);
console.log(value);
return this.callApi(this.url.DELETEISSUE,'post',body);
 }

 GETISSUELISTS(value: any) {
    let body = JSON.stringify(value);
    return this.callApi(this.url.GETISSUELISTS, 'post', body);
  }
  // getIssuesListbyStatus(value) {
  //   let body = JSON.stringify(value);
  //   console.log(body);
  //   return this.callApi(this.url.GETISSUESLISTBYSTATUS, 'post', body);
  // }
  getIssuesListbyStatus(value) {
    let body = JSON.stringify(value);
    console.log(body);
    return this.callApi(this.url.GETISSUESLISTBYSTATUS, 'post', body);
  }
  getDatabyId_Status(value) {
    let body = JSON.stringify(value);
    console.log(body)
    return this.callApi(this.url.getDatabyId_Status, 'post', body);
  }

  allCollegesAndDeptsUrl(){
    let body = JSON.stringify({});
    return this.callApi(this.url.allCollegesAndDeptsUrl, 'post', body);
  }
  
  getStaffData(value:any){
    let body = JSON.stringify(value);
    return this.callApi(this.url.STAFF_DATA_API, 'post', body);
  }

  addDomain(value:any){
    let body = JSON.stringify(value);
    return this.callApi(this.url.ADDDOMAIN_API, 'post', body); 
  }

  updateDomain(value:any){
    let body = JSON.stringify(value);
    return this.callApi(this.url.UPDATEDOMAIN_API, 'post', body); 
  }

  updateIncharge(value:any){
    let body = JSON.stringify(value);
    return this.callApi(this.url.UPDATEINCHARGE_API, 'post', body); 
  }

  getissuesinprogress(id : any ='')
  {
    let body=JSON.stringify({'reg_no':id});
    console.log(body);
    return this.callApi(this.url.GETISSUESINPROGRESS_API, 'post', body); 
  }

  resolutioninprogress(body)
  {
    console.log(body);
    return this.callApi(this.url.RESOLUTIONINPROGRESS_API, 'post', body); 
  }

  resolutionclosed(body)
  {
    console.log(body);
    return this.callApi(this.url.RESOLUTIONCLOSED_API, 'post', body); 
  }
  getname(body)
  {
    console.log(body);
    return this.callApi(this.url.GETNAME_API, 'post', body); 
  }
  
  
  callApi(url: string, method: string, body: Object): Observable<any> {

    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    //if user is logged in, append token to header
    if (localStorage.getItem('currentUser')) {
      headers.append('token', localStorage.getItem('currentUser'));
    }
    switch (method) {
      case 'post': return this.http.post(url, body, options).map((response: Response) => response.json());
      case 'get': return this.http.get(url, options).map((response: Response) => response.json());
    }
  }

}
