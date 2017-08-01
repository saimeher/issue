import { Injectable } from '@angular/core';
//import { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private router:Router){ }

canActivate(route:ActivatedRouteSnapshot, states:RouterStateSnapshot){

if(localStorage.getItem('currentUser')){
    return true;
}
else {
    this.router.navigate(['login'] );
        return false;
}
}
}