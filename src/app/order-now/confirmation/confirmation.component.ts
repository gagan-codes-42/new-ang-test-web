import { Component, OnInit ,OnDestroy } from '@angular/core';
import { CartService } from '../../services/cartService.service';
import { OrderService   } from '../order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit,OnDestroy {
  orderDetails:any= {};
  cartId!:any;
  location!:any;
  oldCartData= [];
  constructor( private cartService:CartService , private orderService:OrderService , private router: Router) { }

  ngOnInit(): void {
    let sessionData = sessionStorage.getItem('orderConfirmation');
    if(sessionData){
      this.orderDetails = JSON.parse(sessionData);
    }
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
    this.getCartNumberOnLoad();
  }
  ngOnDestroy(){
    this.cartService.cart_items = {};
    this.cartService.setCartNumber(this.getCartNumber());
  }
  getCartNumber(){
    let cart_item_array:any = Object.values(this.cartService.cart_items);
    let count = 0;
    count = cart_item_array.reduce((acc:any , item:any)=>{
      return acc + item.quantity;
    },0)

    return count;
  }

  getCartNumberOnLoad(){
    this.orderService.getOrderCart(this.cartId).subscribe((res)=>{
        if(res && res.items && res.items.length){
           this.oldCartData = res.items
           var count =  res.items.reduce((acc:any,item: any)=>{
              return acc + item.qty;
           },0)
            this.cartService.setCartNumber(count);
        }else {
            this.oldCartData = []
            this.cartService.setCartNumber(0);
        }
    },(err)=>{
      if(err.status === 400){
        this.oldCartData = []
            this.cartService.setCartNumber(0);
      }
    })
  }
  
  backToMenu(){
    this.router.navigate(['ordernow', 'menu-card']);
  }
}
