import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  //form group
  addUser!: FormGroup;
  empList: any

  constructor (private fb: FormBuilder, 
    private modal: NgbModal,
    private router: Router, 
    private httpService: HttpService,
    private toastr: ToastrService) {
  

    // MODAL
    //set validations
    this.addUser = this.fb.group({
      emp_id: ['', [Validators.required]],
      user_type: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })

  }

  ngOnInit():void{
    this.getEmpList()
  }


  submitForm(){

    //make http post request
    this.httpService.post("https://hcm-test-b53ed02fdf2d.herokuapp.com/users/add", this.addUser.value).subscribe((results: any) => {

      if(results.status){
        this.toastr.success(results.message, 'Success!');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/users'])
          );
      }else{
        this.toastr.warning(results.message, 'Error!');
          this.router.navigateByUrl('/users', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/users'])
          );
      }

      this.closeModal()
    })
    
  }

  getEmpList(){
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/usersList").subscribe((results: any) => {
      this.empList =  results.data
    })
  }
 

  closeModal(){
    this.modal.dismissAll();
    // this.router.navigate(['/users'])
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    //     this.router.navigate(['/users'])
    // );
  }
}
