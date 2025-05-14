import { Component, OnInit } from '@angular/core';
import { faShoppingCart ,faBell } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cartService.service';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service'

declare const $: any
@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss']
})
export class OrderHeaderComponent implements OnInit {
  cartItemNo = 0
  faShoppingCart = faShoppingCart;
  faBell = faBell;
  orderhistory: string = 'order-history';
  pendingItemNo = 0
  constructor(private cartService: CartService , private router: Router , private authService: AuthService) { }

  ngOnInit(): void {
    $('.navbar-nav > li').on('click', function() {
      $('.navbar-collapse').collapse('hide');
  });
     this.cartService.getCartNumber().subscribe((res: any)=>{
      this.cartItemNo = res;
     });
     this.getPendingOrder();
     this.authService.getPendingOrder().subscribe((res: any)=>{
      this.pendingItemNo = res;
     });
  }
  navigateToCart(){
    this.router.navigate(['ordernow/cart']);
  }
  navigateToOrderHistory(){
    this.router.navigate(['ordernow/order-history']);
  }
  navigateToReviewOrder(){
    this.router.navigate(['ordernow/order-review']);
  }
  getPendingOrder() {
    this.authService.pendingOrders().subscribe((res)=>{
      const pendingOrder = res?.orders.filter((e: any)=> e.orderStatus ==='pending');
      this.pendingItemNo = pendingOrder.length;
      this.authService.setPendingOrderNumber( this.pendingItemNo || 0);
    })
  }


}
