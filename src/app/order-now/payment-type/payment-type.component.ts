import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef ,MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {

  customerInfo:any;
  selectedOrderType = 'delivery'
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<PaymentTypeComponent>,
    private  router:Router,
    private orderService:OrderService,
    private dialog: MatDialog , @Inject(MAT_BOTTOM_SHEET_DATA) public data:any
  ) { 
    if(data && data[0]){
      this.customerInfo = data[0];
      console.log(this.customerInfo);
    }
      this.selectedOrderType = sessionStorage.getItem('orderType') || 'delivery';
    
  }

  ngOnInit(): void {
  }
  reject() {
    this._bottomSheetRef.dismiss();
  }
  confirm() {
    this.placeOrder();
    
  }
  placeOrder(){
    let id :any = sessionStorage.getItem('deviceid');
    let deviceIdObj= JSON.parse(atob(id));
    let cartId = deviceIdObj?.deviceId || '';
    const payload = {      
          "cartId":cartId,
          "deliveryAddress":  this.customerInfo?.addressData || '',
          "orderType": this.selectedOrderType,
          "modeOfPayment": "gpay",
          "transactionId": ""      
    }
    this.orderService.placeOrder(payload).subscribe((res:any)=>{
         this._bottomSheetRef.dismiss();
         sessionStorage.setItem('orderConfirmation', JSON.stringify(res));
         this.router.navigate(['ordernow/confirmation']);
    },(error)=>{
      this._bottomSheetRef.dismiss();
      let res = {"orderStatus": "notplaced", }
      sessionStorage.setItem('orderConfirmation', JSON.stringify(res));
      this.router.navigate(['ordernow/confirmation']);
    })
  }
}
