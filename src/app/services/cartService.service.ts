import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  tableNumber!: number;
  showcart_sideNav: boolean = false;
  cart_items:any = {};
  curr: any = '';
  orderResponse: any;
  prev_items:any = {};
  menuItems: any = [];
  takeaway: boolean = true;
  deliveryCharges: any = null;
  discount: any = null;
  localitySelected!: String;
  deliveryAvailabilty: boolean = false;
  openedEvent = new Subject<boolean>();
  bs = new BehaviorSubject(0);
  constructor() { }

  itemInCart = (id: string): boolean => {
    let cart_item_array:any = Object.values(this.cart_items);
    for (let i = 0; i < cart_item_array.length; i++) {
      let item = cart_item_array[i]//['item'];
      let Newitem = cart_item_array[i]['item'];
      if (item.itemId == id) { return true; }
      else if(Newitem && Newitem.itemId == id){
        return true; 
      }
    }
    return false;
  };

  itemKeyInCart = (id: string): boolean => {
    return id in this.cart_items;
  };

  getCartItems = () => {
    return Object.values(this.cart_items);
  };

  getTotal = (): number => {
    let sum = 0;
    Object.values(this.cart_items).forEach((cart_item:any) => {
      if (cart_item['type'] === '')
        sum += cart_item['quantity'] *  Number(cart_item['item']['price']);
      else {
        sum += cart_item['quantity'] * Number(cart_item['price']);
      }
    });

    return sum;
  };
  getFinalTotal() {
    let sum = this.getTotal();
    if (this.discount) {
      sum -= sum * (this.discount / 100);
    }
    if (this.deliveryAvailabilty && !this.takeaway) {
      sum += this.deliveryCharges;
    }
    return sum + (sum * 0) / 100;
  }

  getPrice = () => {
    // return Object.values(this.cart_items)[0]['price'];
  };


  setCartNumber(cartNumber: number) {
    this.bs.next(cartNumber);
  }

  clearCart() {
    this.bs.next(0);
  }

  getCartNumber():any {
    return this.bs.asObservable();
  }
}
