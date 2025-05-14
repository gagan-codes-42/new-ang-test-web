import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-smart-invoice',
  templateUrl: './smart-invoice.component.html',
  styleUrls: ['./smart-invoice.component.scss']
})
export class SmartInvoiceComponent implements OnInit {
  orderId: any;
  orderDetails: any;
  isOrderIdPresent = true;
  faDownload = faDownload ;
  blob!: any;
  userPaymentData:any;
  isNumberPresent:boolean = false;
  constructor(private _Activatedroute: ActivatedRoute, private authSvc: AuthService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      console.log('this.orderId>>', this.orderId);
      if (this.orderId) {
        this.authSvc.getOrderDetails(this.orderId).subscribe((res) => {
          this.orderDetails = res;
          this.getUserPaymentData(res?.cartId);
          this.isOrderIdPresent = true;
        },(error)=>{
          this.isOrderIdPresent = false;
        })
      }
      else { 
        this.isOrderIdPresent = false;
      }
    });
  }

  getDate(date:any) : any{
    if(date){
      return  this.datePipe.transform(new Date(date) , 'MMM d, y, h:mm a');
    }else {
      return ' - '
    }
  }
  downloadBill() {
    this.authSvc.getBill(this.orderId).subscribe((res:any) => {
      this.blob = new Blob([res], { type: 'application/pdf' });

      var downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download =`Bill-${this.orderId}.pdf`;
      link.click();
    })
  }
  getUserPaymentData(cartId:any) {
    this.authSvc.getPaymentProfile(cartId).subscribe((result) => {
      console.log(result);
      this.userPaymentData = [];
      this.userPaymentData = result?.paymentMethods;
      const isNumberPresentInArray = this.userPaymentData.filter((e:any)=> e.phoneNumber !== '');
      this.isNumberPresent = isNumberPresentInArray.length ? true : false;
    })
  }

}
