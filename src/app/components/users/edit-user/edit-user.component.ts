import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  //form group
  addUser!: FormGroup;
  empList: any
  id: any

  constructor (private fb: FormBuilder, 
    private modal: NgbModal,
    private router: Router, 
    private httpService: HttpService,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
  

    //set validations
    this.addUser = this.fb.group({
      emp_id: ['', [Validators.required]],
      user_type: ['', [Validators.required]]
    })

    //get id from url
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];// geting id
    })

  //  if (this.id) {
  //   this.http.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/users/"+this.id).subscribe((results: any) => {
  //      this.empList = results.data//setting result to modalData variable
  //      console.log(this.empList)
  //      //set validations
  //      this.addUser = this.fb.group({
  //       emp_id: [this.empList[0].emp_id, [Validators.required]],
  //       user_type: [this.empList[0].user_type, [Validators.required]]
  //      })
  //    })
  //  } 
  }
  

  ngOnInit(){
    if (this.id) {
      this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/users/"+this.id).subscribe((results: any) => {
         this.empList = results.data//setting result to modalData variable
        //  console.log(this.empList)
         //set validations
         this.addUser = this.fb.group({
          emp_id: [this.empList[0].emp_id, [Validators.required]],
          user_type: [this.empList[0].user_type, [Validators.required]]
        })
      })
    }
  }


  submitForm(){

    //make http post request
    this.httpService.patch("https://hcm-test-b53ed02fdf2d.herokuapp.com/users/update/"+this.id, this.addUser.value).subscribe((results: any) => {

      if(results.status){
        this.toastr.success('User Updated Successfully', 'Success!');
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

    this.modal.dismissAll();
    
  }
 

  closeModal(){
    this.modal.dismissAll();
    // this.router.navigate(['/users'])
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        // this.router.navigate(['/manageUsers'])
    // );
  }
}
