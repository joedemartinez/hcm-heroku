import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

 
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  emp: any
  empDetails: any
  date: any
  priv: any
  token:any
  
  constructor ( private breadcrumb: BreadcrumbService, private toastr: ToastrService,
    private httpService: HttpService,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute) {
   
    this.breadcrumb.setPageDetails('Employees','Employees','/employees','')//breadcrumb values

    this.getEmpDetails();//get employees details

  }

  ngOnInit(){
    // Read the initial value from local storage
    this.token = localStorage.getItem('jwt');
    //get token values
    const parts = this.token.split('.');
    // Decode the base64-encoded payload
    const payload = JSON.parse(atob(parts[1]))

    this.priv = payload.user_type
  }



  getEmpDetails(){
    //Emp
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/employees").subscribe((results: any) => {
      this.empDetails =  results.data
      // console.log(this.empDetails)
      setTimeout(()=>{
        $('#empDataTable').DataTable( {
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

  

  conDate(val:any){ //conveting date to proper format
    this.date = new Date(val)
    const year = this.date.getFullYear();
    const month = ('0' + (this.date.getMonth() + 1)).slice(-2); // add leading zero if month is single digit
    const day = ('0' + this.date.getDate()).slice(-2); // add leading zero if day is single digit
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  //open modal
  openModal(){
    this.modal.open(AddEmployeeComponent, { backdrop: false, size: 'lg' })
  }

  editMode(){
    this.router.navigateByUrl('/manageEmployees')
  }
}
