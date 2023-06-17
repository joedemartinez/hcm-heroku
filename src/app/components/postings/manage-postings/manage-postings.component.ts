import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { HttpService } from 'src/app/services/http.service';
import { AddPostingComponent } from '../add-posting/add-posting.component';

@Component({
  selector: 'app-manage-postings',
  templateUrl: './manage-postings.component.html',
  styleUrls: ['./manage-postings.component.css']
})
export class ManagePostingsComponent {
  posting: any
  postingDetails: any
  date: any
  
  constructor ( private breadcrumb: BreadcrumbService, private toastr: ToastrService,
    private httpService: HttpService,
    private modal: NgbModal,
    private router: Router) {

    this.breadcrumb.setPageDetails('Manage Postings','Postings','/postings','Manage Postings')//breadcrumb values

    this.getPostingDetails();//get employees details

  }

  getPostingDetails(){
    //posting
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/postings").subscribe((results: any) => {
      this.postingDetails =  results.data
      
      setTimeout(()=>{
        $('#postingDataTable').DataTable( {
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
    this.router.navigate(['/postings'])
  }

  editPosting(){
    this.modal.open(AddPostingComponent, { backdrop: false, size: 'lg' })
  }

  deletePosting(id:any){
      // console.log(id)
      const proceed = confirm('Are you sure you want to delete this posting?');


    if(proceed){
      // console.log(id)
      //make http post request
      this.httpService.delete("https://hcm-test-b53ed02fdf2d.herokuapp.com/postings/delete/"+id).subscribe((results: any) => {

        if(results.status){
          this.toastr.success('Posting Deleted Successfully', 'Success!');
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                this.router.navigate(['/managePostings'])
            );
        }else{
          this.toastr.warning('Oops!! Error Occured', 'Error!');
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                this.router.navigate(['/managePostings'])
            );
        }
      })
    }
  }
}
