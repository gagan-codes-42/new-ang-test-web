import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { CustomerService } from './../customer.service';
import { CartService } from '../../services/cartService.service';
import { PaymentTypeComponent  } from '../payment-type/payment-type.component';
import { OrderService } from '../order.service';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { OrderTypeComponent }  from '../order-type/order-type.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  loading: boolean = false;
  orderType = "Home Delivery";
  quantity:any;
  cartId='epanipuricart.dummy.1';
  cartitem!:any;
  location!:string;
  data: any = [];
  tempData: any = [];
  categories:any = [];
  allItems: any = [];
  tempAllItems: any = [];
  oldCartData: any = [];
  cartData:any = [];
  open:boolean = false;
  price = 0;
  faShoppingCart = faShoppingCart;
  constructor(
    public cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private _bottomSheet: MatBottomSheet,
    // private customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private  orderService :OrderService
  ) {}

  ngOnInit(): void {
    console.log(this.cartService.cart_items);
    let id = sessionStorage.getItem('deviceid');
    let location = sessionStorage.getItem('location');
 
    if(id) {
      const deviceIdObj= JSON.parse(atob(id));
      this.cartId = deviceIdObj?.deviceId || '';
    }
    if(location){
     const locationObj= JSON.parse(atob(location));
     this.location = locationObj?.location || '';
    }
    this.getMenuCard();
  }

  onQuantityChanges = (obj:any, itemObj :any) => {
    let item = itemObj.value;
    let key = itemObj.key;
    if (obj.quantity === 0 || !obj.isItemIncrease) {
      // delete this.cartService.cart_items[key];
      // this.cartService.setCartNumber(this.getCartNumber());
      let removeEntireItem = obj.quantity === 0 
      this.onRemoveFromCart(key , removeEntireItem);
    } else {
      this.cartService.cart_items[key].quantity = obj.quantity;
      this.cartService.setCartNumber(this.getCartNumber());
      this.onAddToCart(key)
    }
    this.quantity = obj.quantity
    this.price = this.cartService.cart_items[key].price;
  };

  onAddToCart = (key:any) => {
    console.log(this.cartService.cart_items);

    const payload ={
      itemId:key
    }
    this.orderService.addToOrderCart(payload).subscribe((res:any)=>{
      console.log(res);
      if(res && res.message === 'Success'){
        this.cartService.cart_items[key] = {
          item: this.cartService.cart_items[key]['item'],
          quantity: this.quantity,
          type: "",
          price: this.price,
        };
        this.cartService.prev_items[key] = {
          cartItemId: key,
          customization:"",
          value: {
            item: this.cartService.cart_items[key]['item'],
            quantity: this.quantity,
            type: "",
            price: this.price,
          },
        };
       // this.cartService.curr = this.data.price;
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

  onBack = () => {
    this.router.navigate(['ordernow/menu-card']);
  };

  onRemove = (item:any) => {
    // delete this.cartService.cart_items[item.key];
    this.onRemoveFromCart(item.key,true);
   

  };

  getLength = () => {
    return Object.keys(this.cartService.cart_items).length;
  };

  onCheckout = () => {
    console.log(this.cartService.cart_items);
    // const bottomSheetRef = this._bottomSheet.open(PaymentTypeComponent);
    // if(!this.cartService.deliveryAvailabilty){
    // this.router.navigate(['/payment']);
     const bottomSheetRef = this._bottomSheet.open(OrderTypeComponent);
    // }
    // else{
    // const bottomSheetRef = this._bottomSheet.open(OrderTypeComponent);
    // }
    //this.router.navigate(['/payment']);
  };

  // onCheckoutOrder = () => {
  //   let orderedItems = [];
  //   let customer: any = this.customerService.customer.getValue();
  //   Object.values(this.cartService.cart_items).forEach((cart_item) => {
  //     orderedItems.push({
  //       itemId: cart_item['item'].id,
  //       itemName: cart_item['item'].name,
  //       quantity: cart_item['quantity'],
  //     });
  //   });
  //   let order = {
  //     orderedItems,
  //     status: 'INITIATED',
  //     customerName: customer.customerName,
  //     addressLine1: customer.addressLine1,
  //     addressLine2: customer.addressLine2,
  //     city: customer.city,
  //     customerEmail: customer.customerEmail,
  //     phoneNumber: customer.phoneNumber,
  //     pincode: customer.pincode,
  //     state: customer.state,
  //     totalPrice: this.cartService.getTotal()
  //   };
  //   this.loading = true;
  //   this.http.post(`${environment.SERVER_URL}/order`, order).subscribe(
  //     (response) => {
  //       this.loading = false;
  //       this.cartService.cart_items = {};
  //       this.router.navigate(['menu']);
  //       this._snackBar.open('Your order has been placed!', '', {
  //         duration: 3000,
  //       });
  //     },
  //     (error) => {
  //       this.loading = false;
  //       this._snackBar.open('An error occured!', '', {
  //         duration: 3000,
  //       });
  //     }
  //   );
  // };
  getPropertyValue(item :any ,property :any , isInnerProperty:any){
      return isInnerProperty ? item.value.item[property] : item.value[property] ;
  }
  onRemoveFromCart = (key:any ,removeEntireItem:boolean) => {
    const payload = {
      itemId : key
    }
    this.orderService.removeFromOrderCart(payload).subscribe((res:any)=>{
      if(removeEntireItem){
        delete this.cartService.cart_items[key];
      }else {
        this.cartService.cart_items[key].quantity = this.quantity;
      }
     
      this.cartService.setCartNumber(this.getCartNumber());
      this._snackBar.open('Item removed from cart', '', {
        duration: 3000,
      });
    },(err:any)=>{
      this._snackBar.open('Something went wrong', '', {
        duration: 3000,
      });
    })
    
  };
  getCartNumber(){
    let cart_item_array:any = Object.values(this.cartService.cart_items);
    let count = 0;
    count = cart_item_array.reduce((acc:any , item:any)=>{
      return acc + item.quantity;
    },0)

    return count;
  }
  getOrderType(){
    let orderType = sessionStorage.getItem('orderType');
    switch(orderType) { 
      case 'delivery': { 
        this.orderType = 'Home Delivery';
         break; 
      } 
      case 'takeAway': { 
        this.orderType = 'Take Away';
         break; 
      } 
      case 'dineIn': { 
        this.orderType = 'Dine In';
        break; 
     } 
      default: { 
        this.orderType = 'Home Delivery';
         break; 
      } 
   }
   return this.orderType;

  }
  getCartNumberOnLoad(){
    this.orderService.getOrderCart(this.cartId).subscribe((res)=>{
        if(res && res.items && res.items.length){
           this.oldCartData = res.items
           var count =  res.items.reduce((acc:any,item: any)=>{
              return acc + item.qty;
           },0)
            this.cartService.setCartNumber(count);
            this.buildCartServiceData();
        }else {
            this.oldCartData = []
            this.cartService.setCartNumber(0);
        }
    })
  }

 async buildCartServiceData(){
    let len = this.oldCartData.length || 0 ;
    for(let i=0; i < len ; i++){
        let item = this.allItems.filter((e:any)=>{
          return e.itemId === this.oldCartData[i].itemId;
        })
        if(item.length){
          this.cartService.cart_items[item[0].itemId] = {
            item: item[0],
            quantity: this.oldCartData[i].qty,
            type: "",
            price: item[0].price,
          };
          this.cartService.prev_items[item[0].itemId] = {
            cartItemId: item[0].itemId,
            customization :'',
            value: {
              item:item[0],
              quantity: this.oldCartData[i].qty,
              type: "",
              price: item[0].price,
            },
          };
        }
    }
  }
  getMenuCard(){
    this.orderService.getMenuCard(this.cartId).subscribe((res :any)=>{
      console.log(res)
      this.data = res.menu;
      this.cartData = res.menu;
      this.open = res.isActive;

      this.tempData = JSON.parse(JSON.stringify(this.data));
      this.data.forEach((element:any) => {
        this.categories.push({ "name": element.category });
        element.items.forEach((item:any) => {
          this.allItems.push(item);
        });
      });
      this.cartService.menuItems = this.allItems;
      this.cartService.discount = res.flatDiscount;
      this.getCartNumberOnLoad(); 
    },(err :any)=>{
      console.log(err)
    })
  }
}

