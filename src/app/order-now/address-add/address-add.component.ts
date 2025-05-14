import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OrderService } from '../order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit {

  addressForm!: FormGroup;
  constructor(private router: Router , 
    public _bottomSheetRef: MatBottomSheetRef<AddressAddComponent>, 
    private _paymentBottomSheet: MatBottomSheetRef<PaymentTypeComponent>,
    private _bottomSheet: MatBottomSheet,
    private orderservice:OrderService, private fb: FormBuilder,) {
      this.addressForm = this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]]
      
      });
     }

  ngOnInit(): void {
  }
  addNew(){
    if(this.addressForm.valid){
       let address= [];
       address.push(this.addressForm.controls['addressLine1'].value);
       address.push(this.addressForm.controls['addressLine2'].value);
       address.push(this.addressForm.controls['city'].value);
       address.push(this.addressForm.controls['state'].value);
       address.push(this.addressForm.controls['zip'].value);

       const payload = {
           address: address.join(',')
       }

       this.orderservice.addAddress(payload).subscribe((res)=>{
         this._bottomSheetRef.dismiss();
       })

    }

  }
}
