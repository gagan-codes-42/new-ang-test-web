import { Component, OnInit,Inject } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OrderService } from '../order.service';
import { AddressAddComponent } from '../address-add/address-add.component';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressData:any=[];
  selectedOrderType = '';
  constructor(private router: Router , 
    public _bottomSheetRef: MatBottomSheetRef<AddressAddComponent>, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public data:any,
    private _bottomSheet: MatBottomSheet,
    private orderservice:OrderService) { 
      this.addressData = data;
      if(this.addressData.length){
        this.selectedOrderType = this.addressData[0]?.addressId;
      }
    }

  ngOnInit(): void {
    
  }

  addnewAddress(){
    this._bottomSheet.open(AddressAddComponent)
  }
  ProceedToNext(){
    console.log(this.selectedOrderType);
    let address = this.addressData.filter((e:any)=> e.addressId === this.selectedOrderType);
    this._bottomSheet.open(PaymentTypeComponent,{ data : address });
  }
}
