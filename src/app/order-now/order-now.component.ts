import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../order-now/order.service';
import { FbAuthService } from '../shared/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { OrderConfDialogComponent} from '../order-now/order-conf-dialog/order-conf-dialog.component';
@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.scss']
})
export class OrderNowComponent implements OnInit, OnDestroy {
  token: string = '';
  private subscriptions: Subscription = new Subscription();
  constructor( private orderSvc: OrderService ,private fbAuthService :FbAuthService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token =  this.fbAuthService.userToken || '';
    this.subscriptions.add(
      this.orderSvc.registerCartSID(this.token).subscribe((res) => {
        console.log(res);
        this.listenForOrders();
      })
    );
  }
  listenForOrders() {
    this.subscriptions.add(
      this.orderSvc.listenForOrders().subscribe((orderDetails:any) => {
        console.log(orderDetails);
        const dialogRef = this.dialog.open(OrderConfDialogComponent,{
          data: { details: orderDetails},
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
