import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { DatePipe } from '@angular/common';
import { CartService } from '../../services/cartService.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.component.html',
  styleUrls: ['./ordertracking.component.scss']
})
export class OrdertrackingComponent implements OnInit {
  trackingOrderId: any;
  trackHistory: any[] = [];
  currentState: any;
  completedState: any = [];
  imageToShow: any;
  isImageLoading = true;
  orderItems: any = [];
  orderDetails!: any;
  location: any = '';
  city: any = '';
  faFileDownload = faDownload;
  orderType = 'Home Delivery';
  blob!: any;
  private subscriptions: Subscription = new Subscription();
  constructor(private router: Router, private orderService: OrderService, private datePipe: DatePipe, public cartService: CartService) { }

  ngOnInit(): void {
    this.trackingOrderId = sessionStorage.getItem('OrderIdTracking')
    if (this.trackingOrderId) {

      this.subscriptions.add(
        this.orderService.getOrderByOrderId(this.trackingOrderId).subscribe((res: any) => {
          console.log('check>>>>', res);
          this.orderDetails = res;
          this.location = res?.location || '';
          this.city = res?.city || '';
          this.orderItems = this.orderDetails?.items;

        })
      );

    } else {
      this.router.navigate(['ordernow/order-history']);
    }

  }

  getDate(status: any): any {
    let history: any[] = [];
    history = this.trackHistory.filter((e) => e.status === status);
    if (history.length) {
      let dte = history[0].date;
      return dte ? this.datePipe.transform(new Date(dte), 'MMM d, y') : ''
    }
  }
  getItemTotal(item: any) {
    let amount = 0;
    amount = item.price * item.qty;
    return amount;
  }
  getOrderType() {
    let orderType = this.orderDetails?.orderType;
    switch (orderType) {
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
  downloadBill(orderId: any) {
    this.orderService.getBill(orderId).subscribe((res) => {
      this.blob = new Blob([res], { type: 'application/pdf' });

      var downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download =`Bill-${orderId}.pdf`;
      link.click();
    })
  }
}
