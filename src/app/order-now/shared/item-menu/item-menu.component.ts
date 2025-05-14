import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../../../services/cartService.service';
import { ThrowStmt } from '@angular/compiler';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
})
export class ItemMenuComponent implements OnInit {
  quantity: number = 1;
  genericImgSrc = 'assets/img/generic-img-3.jpeg';
  itemForm!: FormGroup;
  cartItemId!: string;
  env: any;
  constructor(
    public dialogRef: MatDialogRef<ItemMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    private orderService:OrderService
  ) {
    this.env = environment;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.item.availableQuantity?.length) {
      this.itemForm = this.fb.group({
        customization: [
          this.data.item.availableQuantity[0].name,
          [Validators.required],
        ],
      });
    } else {
      this.itemForm = this.fb.group({
        customization: ['', []],
      });
    }
    this.cartItemId =
      this.data.item.itemId + this.itemForm.get('customization')!.value;
    if (this.cartService.itemKeyInCart(this.cartItemId)) {
      this.quantity = this.cartService.cart_items[this.cartItemId].quantity;
    }
    this.itemForm.get('customization')!.valueChanges.subscribe((val) => {
      this.cartItemId = this.data.item.itemId + val;
      if (this.cartService.cart_items[this.cartItemId]) {
        this.quantity = this.cartService.cart_items[this.cartItemId].quantity;
      }
    });
  }

  onAddToCart = () => {
    console.log(this.cartService.cart_items);

    const payload ={
      itemId:this.data.item.itemId
    }
    this.orderService.addToOrderCart(payload).subscribe((res:any)=>{
      console.log(res);
      if(res && res.message === 'Success'){
        let customization = this.itemForm.get('customization')!.value;
        let price = '';
        this.quantity = 1;
        if (customization) {
          this.data.item.availableQuantity.forEach((item:any) => {
            if (item.name === customization) price = item.price;
          });
        }
        else{
          price=this.data.item.price
        }
        this.cartService.cart_items[this.cartItemId] = {
          ...this.data,
          quantity: this.quantity,
          type: customization,
          price: price,
        };
        this.cartService.prev_items[this.data.item.itemId] = {
          cartItemId: this.cartItemId,
          customization,
          value: {
            ...this.data,
            quantity: this.quantity,
            type: customization,
            price: price,
          },
        };
        this.cartService.curr = this.data.price;
        this._snackBar.open('Item added to cart', '', {
          duration: 3000,
        });
        console.log(Object.keys(this.cartService.cart_items).length);
        this.cartService.setCartNumber(this.getCartNumber());
       
      }else {
        this._snackBar.open('Something went wrong', '', {
          duration: 3000,
        });
      }
    },(err:any)=>{
      this._snackBar.open('Something went wrong', '', {
        duration: 3000,
      });
    })
  };

  onQuantityChanges = (obj:any) => {
    let customization = this.itemForm.get('customization')!.value;
    if (obj.quantity === 0 || !obj.isItemIncrease) {
      // delete this.cartService.cart_items[this.cartItemId];
      let removeEntireItem = obj.quantity === 0;
      this.onRemoveFromCart(removeEntireItem);
    } else if (this.cartService.itemKeyInCart(this.cartItemId)) {
      this.addUpdateItemQuantity(this.cartItemId , obj.quantity,customization)
      // this.cartService.cart_items[this.cartItemId].quantity = quantity;
      // this.cartService.prev_items[this.data.item.itemId] = {
      //   cartItemId: this.cartItemId,
      //   customization,
      //   value: this.cartService.cart_items[this.cartItemId],
      // };
      // this.cartService.setCartNumber(this.getCartNumber());
    }
    this.quantity = obj.quantity;
  };

  itemInCart = (): boolean => {
    return this.cartService.itemKeyInCart(this.cartItemId);
  };

  onRemoveFromCart = (removeEntireItem:any) => {
    const payload = {
      itemId : this.cartItemId
    }
    this.orderService.removeFromOrderCart(payload).subscribe((res:any)=>{
      if(removeEntireItem){
          delete this.cartService.cart_items[this.cartItemId];
      }else {
     this.cartService.cart_items[this.cartItemId].quantity = this.quantity;
      }
      this._snackBar.open('Item removed from cart', '', {
        duration: 3000,
      });
      this.cartService.setCartNumber(this.getCartNumber());
    },(err:any)=>{
      this._snackBar.open('Something went wrong', '', {
        duration: 3000,
      });
    })
    
  };

  getCustomization = () => {
    return this.itemForm.get('customization')!.value;
  };

  getCartNumber(){
    let cart_item_array:any = Object.values(this.cartService.cart_items);
    let count = 0;
    count = cart_item_array.reduce((acc:any , item:any)=>{
      return acc + item.quantity;
    },0)

    return count;
  }
   
  addUpdateItemQuantity(id: any , quantity: any , customization: any){
    const payload = {
      itemId:id
    }
    this.orderService.addToOrderCart(payload).subscribe((res:any)=>{
      console.log(res);
      if(res && res.message === 'Success'){
      this.cartService.cart_items[id].quantity = quantity;
      this.cartService.prev_items[id] = {
        cartItemId: id,
        customization,
        value: this.cartService.cart_items[id],
      };
      this.cartService.setCartNumber(this.getCartNumber());
       
      } else {
        this._snackBar.open('Something went wrong', '', {
          duration: 3000,
        });
      }
    },(err:any)=>{
      this._snackBar.open('Something went wrong', '', {
        duration: 3000,
      });
    })

  }

}

