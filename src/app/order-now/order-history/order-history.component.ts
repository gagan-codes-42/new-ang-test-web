import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FbAuthService } from '../../shared/services/auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  token: any = '';
  myOrderList: any = [];
  mytempOrderList: any = [];
  // MatPaginator Inputs
  orderlength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];
  pageEvent!: PageEvent;
  constructor(
    private orderService: OrderService,
    private fbAuthService: FbAuthService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.fbAuthService.userToken || '';
    this.getAllorderStatus(this.token);
  }

  getAllorderStatus(token: string) {
    this.subscriptions.add(
      this.orderService.allOrderStatus(token).subscribe((res: any) => {
        console.log(res);
        if (res && res.orders) {
          this.myOrderList = res.orders;
          this.mytempOrderList = res.orders;
          this.orderlength = res.orders.length;
          const pagination = {
            previousPageIndex: 0,
            pageIndex: 0,
            pageSize: 5,
            length: this.orderlength,
          };
          this.iterator(pagination);
        }
      })
    );
  }

  getOrderByOrderId(orderId: any) {
    sessionStorage.setItem('OrderIdTracking', orderId);
    this.router.navigate(['ordernow/order-tracking']);
  }

  getDate(date: any): any {
    if (date) {
      return this.datePipe.transform(new Date(date), 'MMM d, y');
    } else {
      return ' - ';
    }
  }
  getData(event: any) {
    console.log(event);
    this.iterator(event);
    return event;
  }
  private iterator(event: any) {
    this.mytempOrderList = this.myOrderList;
    const end = (event.pageIndex + 1) * event.pageSize;
    const start = event.pageIndex * event.pageSize;
    const part = this.mytempOrderList.slice(start, end);
    this.mytempOrderList = part;
  }
}
