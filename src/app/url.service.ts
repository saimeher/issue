import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
  // Url: string = 'http://210.16.79.137/issueregister/server/api/';
    Url: string = 'http://localhost/issue_register/api/';
  //Url: string = 'http://210.16.79.137/raghuerp/dailyreport/server/api/';
  //public LOGIN_API: string = 'http://210.16.79.137/raghuerp/server/api/validLogin';
  public LOGIN_API: string = this.Url + 'loginCheck';
  public GETROLE_API: string = this.Url + 'getRole';
  public GETISSUESLIST: string = this.Url + 'getIssuesList';
  public GETCATEGORIES: string = this.Url + 'getCategories';
  public GETISSUESLISTBYCATEGORY: string = this.Url + 'getIssuesListbyCategory';
  public GETISSUESLISTBYSELECTION: string = this.Url + 'getIssuesListBySelection';
  public INSERTISSUE: string = this.Url + 'INSERTISSUE';
  public GETDETAILS: string = this.Url + 'GETDETAILS';
  public GETDOMAINSBYID: string = this.Url + 'getDomainsbyId';
  public UPDATEISSUE: string = this.Url + 'UPDATEISSUE';
  public DELETEISSUE: string = this.Url + 'DELETEISSUE';
  public MODIFYISSUE: string = this.Url + 'modifyIssue';
  public getissue: string = this.Url + 'getissue';
  public GETALLISSUES: string = this.Url + 'getAllIssues';
  public updateissues: string = this.Url + 'updateissues';
  public getImagesbyId: string = this.Url + 'getImagesbyId';
  public getDatabyId_Domain: string = this.Url + 'getDatabyId_Domain';
  //public updateImage: string = this.Url + 'updateImage';
  public GETISSUELISTS:string  = this.Url +'GETISSUELISTS';
 public  GETISSUESLISTBYSTATUS : string = this.Url + 'getIssuesListbyStatus';
 public getDatabyId_Status: string = this.Url + 'getDatabyId_Status';

  constructor() { }

}
