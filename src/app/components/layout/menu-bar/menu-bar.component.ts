import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutService } from 'src/app/services/logout.service';
import { ChangePasswordComponent } from '../../change-password/change-password.component';
import { ProfileComponent } from '../../profile/profile.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  date = new Date()
  todayDate:String =this.date.toUTCString()
  log: any
  emp_name:any
  photo:any
  token:any

  constructor( private logout: LogoutService,
    private modal: NgbModal){  }

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

  //open modal
  openModal(){
    this.modal.open(ProfileComponent, { backdrop: false, size: 'sm' })
  }

  logOut(){
    this.logout.logout()
  }

  changePassword(){
    this.modal.open(ChangePasswordComponent, { backdrop: false, size: 'sm' })
  }

}
