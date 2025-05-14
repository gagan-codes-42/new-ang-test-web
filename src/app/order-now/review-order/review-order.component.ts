import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service'
import {MatDialog} from '@angular/material/dialog';
import { OrderConfDialogComponent} from '../order-conf-dialog/order-conf-dialog.component'

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss']
})
export class ReviewOrderComponent implements OnInit {
  token:any = '';
  myOrderList:any = [];
  mytempOrderList:any = [];
  // MatPaginator Inputs
  orderlength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];
  pageEvent!: PageEvent;
  constructor(private datePipe :DatePipe , private router:Router , private authService: AuthService ,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPendingOrder();
    this.authService.getPendingOrder().subscribe((res: any)=>{
      this.orderlength = res;
     });
  }
  getOrderByOrderId(orderId:any){
    sessionStorage.setItem('OrderIdTracking',orderId);
    this.router.navigate(['ordernow/order-tracking']);
  }
  getDate(date:any) : any{
    if(date){
      return  this.datePipe.transform(new Date(date) , 'MMM d, y');
    }else {
      return ' - '
    }
  }
  getData(event:any){
    console.log(event);
    this.iterator(event);
    return event;
  }
  private iterator(event:any) {
    this.mytempOrderList=this.myOrderList ; 
    const end = (event.pageIndex + 1) * event.pageSize;
    const start = event.pageIndex * event.pageSize;
    const part = this.mytempOrderList.slice(start, end);
    this.mytempOrderList = part;
  }

  getPendingOrder(){
    this.authService.pendingOrders().subscribe((res)=>{
      if(res?.orders){
        const pendingOrder = res?.orders.filter((e: any)=> e.orderStatus ==='pending');
        this.myOrderList = pendingOrder;
        this.mytempOrderList = pendingOrder;
        this.orderlength = pendingOrder.length;
        this.authService.setPendingOrderNumber(this.orderlength || 0)
        const pagination = {previousPageIndex: 0, pageIndex: 0, pageSize: 5, length: this.orderlength};
        this.iterator(pagination);
      }
     
    })
  }
  showConfirmationpopup(orderDetails:any){
    const dialogRef = this.dialog.open(OrderConfDialogComponent,{
      data: { details: orderDetails},
      width:'50vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result :any)  => {
      console.log(`Dialog result: ${result}`);
      this.getPendingOrder();
    });
  }
}