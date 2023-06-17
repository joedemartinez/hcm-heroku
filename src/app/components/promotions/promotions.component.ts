import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { HttpService } from 'src/app/services/http.service';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  promotion: any
  promotionDetails: any
  promotionHistory:any
  date: any
  
  constructor ( private breadcrumb: BreadcrumbService, private toastr: ToastrService,
    private httpService: HttpService,
    private modal: NgbModal) {

    this.breadcrumb.setPageDetails('Promotions','Promotions','/promotions','')//breadcrumb values

    this.getPromotionDetails();//get promotion details
    this.getPromotionHistory() //history

  }

  getPromotionDetails(){
    //promotions
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/promotions").subscribe((results: any) => {
      this.promotionHistory =  results.data
      // console.log(this.promotionDetails)
      setTimeout(()=>{
        $('#promotionsDataTable').DataTable( {
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

  getPromotionHistory(){
    //promotions history
    this.httpService.get("https://hcm-test-b53ed02fdf2d.herokuapp.com/promotionHistory").subscribe((results: any) => {
      this.promotionDetails =  results.data
      // console.log(this.promotionHistory)
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
    this.modal.open(AddPromotionComponent, { backdrop: false, size: 'lg' })
  }
}
