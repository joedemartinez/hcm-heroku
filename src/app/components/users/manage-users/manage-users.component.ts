import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { HttpService } from 'src/app/services/http.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  user: any
  usersDetails: any
  empList:any
  date: any
  id:any
  ifMe: any
  token:any
  
  constructor ( private breadcrumb: BreadcrumbService, private toastr: ToastrService,
    private httpService: HttpService,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute) {

    this.breadcrumb.setPageDetails('Manage Users','Users','/users','Manage Users')//breadcrumb values

    this.getUsersDetails();//get Users details
    this.getEmpList() //
      
    // Read the initial value from local storage
    this.token = localStorage.getItem('jwt');
    //get token values
    const parts = this.token.split('.');
    // Decode the base64-encoded payload
    const payload = JSON.parse(atob(parts[1]))

    this.ifMe = payload.user
    //value to hide action btns on loggedIn user
  }

  

  getUsersDetails(){
    //users
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/userEmp").subscribe((results: any) => {
      this.usersDetails =  results.data
      setTimeout(()=>{
        $('#usersDataTable').DataTable( {
          pagingType: 'simple_numbers',
          dom: 'C<"clear">lBfrtip',
          // dom: '<B<"clear">liflp',
          pageLength: 10,
          searching: true,
          processing: true,
          lengthMenu : [5, 10, 25, 50],
          destroy: true
        } );
      }, 2); 
    })
  }

  getEmpList(){
    //users 
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/employees").subscribe((results: any) => {
      this.empList =  results.data
      
    })
  }
  

  conDate(val:any){ //conveting date to proper format
    this.date = new Date(val)
    const year = this.date.getFullYear();
    const month = ('0' + (this.date.getMonth() + 1)).slice(-2); // add leading zero if month is single digit
    const day = ('0' + this.date.getDate()).slice(-2); // add leading zero if day is single digit
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  editUser(){
    this.modal.open(EditUserComponent, { backdrop: false, size: 'sm' })
  }

  deleteUser(id:any){
    const proceed = confirm('Are you sure you want to delete this user?');


    if(proceed){
      // console.log(id)
      //make http post request
      this.httpService.delete("https://hcm-test-b53ed02fdf2d.herokuapp.com/users/delete/"+id).subscribe((results: any) => {

        if(results.status){
          this.toastr.success('User Deleted Successfully', 'Success!');
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                this.router.navigate(['/manageUsers'])
            );
        }else{
          this.toastr.warning('Oops!! Error Occured', 'Error!');
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                this.router.navigate(['/manageUsers'])
            );
        }
      })
    }

    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    //     this.router.navigate(['/manageUsers'])
    // );
  }


  resetPassword(id:any){
    const proceed = confirm("Are you sure you want to reset this user's password?");

    if(proceed){
      // console.log(id)
      //make http post request
      this.httpService.patch("https://hcm-test-b53ed02fdf2d.herokuapp.com/users/reset/"+id, id).subscribe((results: any) => {

        if(results.status){
          this.toastr.success('User Password Reset Successfully', 'Success!');
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                this.router.navigate(['/manageUsers'])
            );
        }else{
          this.toastr.warning('Oops!! Error Occured', 'Error!');
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                this.router.navigate(['/manageUsers'])
            );
        }
      })
    }
  }

}
