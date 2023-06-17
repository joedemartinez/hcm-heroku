import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageAuthGuard implements CanActivate {
  
  constructor(private router: Router){}


  log:any
  manageAuth:any
  token:any

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    // Read the initial value from local storage
    this.token = localStorage.getItem('jwt');
    //get token values
    const parts = this.token.split('.');
    // Decode the base64-encoded payload
    const payload = JSON.parse(atob(parts[1]))

    this.manageAuth = payload.user_type
    
    this.log = localStorage.getItem('loggedIn');

    // Listen for the storage event and update the value in real-time
    setInterval(()=>{
      window.addEventListener('storage', () => {
        this.log = localStorage.getItem('loggedIn');
        this.manageAuth = localStorage.getItem('user_type')
      })
    },1)


    if (this.log === 'true' && this.manageAuth === 'admin') {
      return true; //if logged In
    } else {
      this.router.navigate(['/login']) //go to login page if not logged in
      return false
    }

    
    
  }
  
}
