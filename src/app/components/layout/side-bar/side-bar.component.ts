import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  emp: any
  exits:any
  units:any
  users:any
  emp_name:any
  photo:any
  token:any

  constructor ( private httpService: HttpService,
    private logout: LogoutService) {
    this.getVal()
  }

  ngOnInit(){
    // Read the initial value from local storage
    this.token = localStorage.getItem('jwt');
    //get token values
    const parts = this.token.split('.');
    // Decode the base64-encoded payload
    const payload = JSON.parse(atob(parts[1]))

    this.emp_name = payload.name;
    this.photo = payload.photo
  }

  getVal(){
    //Emp
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/count/employees").subscribe((results: any) => {
      this.emp =  results.data[0]?.count
    })
    //Exits
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/count/exits").subscribe((results: any) => {
      this.exits =  results.data[0]?.count
      //if there's no document
      if (!this.exits) {
        this.exits =  0
      }
    })
    //units
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/count/units").subscribe((results: any) => {
      this.units =  results.data[0]?.count 
    })
    //Users
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/count/users").subscribe((results: any) => {
      this.users = results.data[0]?.count
    })
  }

  logOut(){
    this.logout.logout()
  }
}
