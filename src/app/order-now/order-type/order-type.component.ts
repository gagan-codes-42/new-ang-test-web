import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddressComponent } from '../address/address.component';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.scss']
})
export class OrderTypeComponent implements OnInit {
  selectedOrderType = 'delivery';
  faArrowLeft = faArrowLeft;
  addressDeatils = [];
  constructor( private router: Router , 
    private _bottomSheetRef: MatBottomSheetRef<OrderTypeComponent>, 
    private _paymentBottomSheet: MatBottomSheetRef<PaymentTypeComponent>,
    private _bottomSheet: MatBottomSheet,
    private orderservice:OrderService) { }

  ngOnInit(): void {
    this.orderservice.getAddress().subscribe((res)=>{
      this.addressDeatils = res.address;
    },(error)=>{
    
    })
  }
  confirm(){
    sessionStorage.setItem('orderType',this.selectedOrderType);
    this.selectedOrderType === 'delivery' ? this._bottomSheet.open(AddressComponent,{  data: this.addressDeatils}) : this._bottomSheet.open(PaymentTypeComponent);
    this._bottomSheetRef.dismiss();
  }
  reject(){
    this._bottomSheetRef.dismiss();
  }

}
